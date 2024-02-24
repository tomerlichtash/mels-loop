import { NextApiRequest, NextApiResponse } from 'next';
import sendEmail from './sendgrid';

const contact = async (req: NextApiRequest, res: NextApiResponse) => {
	const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
	const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${req.body}`;

	try {
		await fetch(verifyUrl, { method: 'POST' });
		await sendEmail(req, res);
		res.status(200).json({ ...req.body });
	} catch (e) {
		res.status(400).json(e.error);
	}
};

export default contact;
