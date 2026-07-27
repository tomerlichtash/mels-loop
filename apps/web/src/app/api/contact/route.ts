import { type NextRequest, NextResponse } from 'next/server';

const POSTMARK_ENDPOINT = 'https://api.postmarkapp.com/email';

/** Longest message we will relay. Postmark accepts far more; this is a lid. */
const MAX_MESSAGE_LENGTH = 5000;
const MAX_NAME_LENGTH = 200;

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

		if (name.length > MAX_NAME_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
			return NextResponse.json({ error: 'Too long' }, { status: 400 });
		}

		/*
		 * Header injection guard. These fields are interpolated into Subject and
		 * Reply-To, and a newline in either is how an attacker appends headers
		 * of their own — a Bcc, say — turning the form into an open relay.
		 */
		if (/[\r\n]/.test(name) || /[\r\n]/.test(email)) {
			return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
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
