import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { token } = await request.json();

		if (!token) {
			return NextResponse.json(
				{ success: false, error: 'No token provided' },
				{ status: 400 },
			);
		}

		const secretKey = process.env.TURNSTILE_SECRET_KEY;
		if (!secretKey) {
			console.error('TURNSTILE_SECRET_KEY not configured');
			return NextResponse.json(
				{ success: false, error: 'Turnstile not configured' },
				{ status: 500 },
			);
		}

		const response = await fetch(
			'https://challenges.cloudflare.com/turnstile/v0/siteverify',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({ secret: secretKey, response: token }),
			},
		);

		const data = await response.json();

		return NextResponse.json({ success: data.success });
	} catch (error) {
		console.error('Turnstile verification error:', error);
		return NextResponse.json(
			{ success: false, error: 'Verification failed' },
			{ status: 500 },
		);
	}
}
