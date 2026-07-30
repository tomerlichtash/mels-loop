import { type NextRequest, NextResponse } from 'next/server';

const POSTMARK_ENDPOINT = 'https://api.postmarkapp.com/email';

/** Longest message we will relay. Postmark accepts far more; this is a lid. */
const MAX_MESSAGE_LENGTH = 5000;
const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254; // RFC 5321 upper bound on a path

/*
 * Deliberately loose. Server-side this exists to reject the obviously
 * malformed, not to adjudicate RFC 5322 — the address is only ever put in
 * Reply-To, and the real test of an address is whether a reply reaches it.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/;

/*
 * A field no human fills in.
 *
 * The captcha is gone, so this is what is left between the endpoint and a
 * drive-by spam bot: a form control hidden from view and from screen readers,
 * which a naive scraper fills because it fills everything. It stops the crude
 * majority and nothing targeted — see the note on the rate limit below.
 */
function looksAutomated(body: Record<string, unknown>): boolean {
	return typeof body.website === 'string' && body.website.trim() !== '';
}

/*
 * ponytail: in-memory, per-instance. Vercel reuses instances under Fluid
 * Compute so this catches the naive case, but it is not shared across them and
 * resets on cold start. Move to a store (Vercel KV, Upstash) if the form is
 * ever actually targeted.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const recentByIp = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
	const now = Date.now();
	const hits = (recentByIp.get(ip) ?? []).filter(
		(t) => now - t < RATE_LIMIT_WINDOW_MS,
	);
	hits.push(now);
	recentByIp.set(ip, hits);
	/* The map would otherwise grow for the lifetime of the instance. */
	if (recentByIp.size > 5000) recentByIp.clear();
	return hits.length > RATE_LIMIT_MAX;
}

/**
 * Relays the contact form to Postmark.
 *
 * Replaces the SendGrid route. The shape is deliberately the same — a single
 * fetch to a JSON API — because there is nothing here worth an SDK: one
 * request, three fields, no templates.
 *
 * The message is sent FROM our own verified address and never from the
 * visitor's. Putting a stranger's address in From is forgery as far as every
 * receiving server is concerned, and it is what breaks a domain's reputation
 * once SPF and DKIM are in place. Their address goes in Reply-To, so hitting
 * reply still reaches them.
 */
export async function POST(request: NextRequest) {
	try {
		const ip =
			request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
			request.headers.get('x-real-ip') ||
			'unknown';

		if (rateLimited(ip)) {
			return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
		}

		const body = await request.json();
		const name = String(body.name ?? '').trim();
		const email = String(body.email ?? '').trim();
		const message = String(body.message ?? '').trim();

		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 },
			);
		}

		if (
			name.length > MAX_NAME_LENGTH ||
			message.length > MAX_MESSAGE_LENGTH ||
			email.length > MAX_EMAIL_LENGTH
		) {
			return NextResponse.json({ error: 'Too long' }, { status: 400 });
		}

		/*
		 * The form validates with zod before submitting, but that runs in the
		 * browser and this endpoint is reachable without it.
		 */
		if (!EMAIL_PATTERN.test(email)) {
			return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
		}

		/*
		 * Header injection guard. These fields are interpolated into Subject and
		 * Reply-To, and a newline in either is how an attacker appends headers
		 * of their own — a Bcc, say — turning the form into an open relay.
		 */
		if (/[\r\n]/.test(name) || /[\r\n]/.test(email)) {
			return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
		}

		/*
		 * Answered as though it sent. Telling a bot which check caught it is
		 * how it learns to pass the next one.
		 */
		if (looksAutomated(body)) {
			console.warn('Contact form honeypot tripped');
			return NextResponse.json({ success: true });
		}

		const token = process.env.POSTMARK_SERVER_TOKEN;
		const toEmail = process.env.CONTACT_TO_EMAIL || 'about@melsloop.com';
		const fromEmail = process.env.CONTACT_FROM_EMAIL || 'noreply@melsloop.com';

		if (!token) {
			/*
			 * Local development without credentials logs instead of sending, so
			 * the form can be exercised end to end. In production a missing token
			 * is a misconfiguration and must not look like success.
			 */
			if (process.env.NODE_ENV === 'development') {
				console.log('[mock] Contact form submission:', {
					name,
					email,
					message,
				});
				return NextResponse.json({ success: true });
			}
			console.error('POSTMARK_SERVER_TOKEN not configured');
			return NextResponse.json(
				{ error: 'Email service not configured' },
				{ status: 500 },
			);
		}

		const response = await fetch(POSTMARK_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'X-Postmark-Server-Token': token,
			},
			body: JSON.stringify({
				From: `Mel's Loop <${fromEmail}>`,
				To: toEmail,
				ReplyTo: `${name} <${email}>`,
				Subject: `Contact form message from ${name}`,
				TextBody: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
				/* Transactional stream. A contact form is not broadcast mail, and
				 * mixing the two on one stream is what gets a sender throttled. */
				MessageStream: 'outbound',
			}),
		});

		const data = await response.json().catch(() => null);

		/*
		 * Postmark answers 200 with ErrorCode 0 on success. A non-zero ErrorCode
		 * can still arrive with a 200 — 300 for a bad address, 406 for an
		 * inactive recipient — so the status alone is not the answer.
		 */
		if (response.ok && data?.ErrorCode === 0) {
			return NextResponse.json({ success: true });
		}

		console.error('Postmark error:', response.status, data);
		return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
	} catch (error) {
		console.error('Contact form error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
