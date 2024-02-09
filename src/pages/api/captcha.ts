import { NextApiRequest, NextApiResponse } from 'next';

const VALIDATE_CAPTCHA_URL = 'https://www.google.com/recaptcha/api/siteverify';

async function validateCaptcha(req: NextApiRequest, res: NextApiResponse) {
	try {
		await fetch(VALIDATE_CAPTCHA_URL, {
			body: JSON.stringify({ value: req.body.value }),
			method: 'POST',
		});
	} catch (error) {
		return res
			.status((error.statusCode as number) || 500)
			.json({ error: error.message });
	}
	return res.status(200).json({ error: '' });
}

export default validateCaptcha;
