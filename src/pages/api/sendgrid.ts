import { NextApiRequest, NextApiResponse } from 'next';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export interface IEmailTemplate extends NextApiRequest {
	fullName: string;
	email: string;
	message: string;
}

const tpl = ({ fullName, email, message }: IEmailTemplate) => {
	return `
		<div>
			<h2>From: ${fullName} &lt;${email}&gt;</h2>
			<div style="padding:2em;border:1px solid #000">
			${message.replace(/\n/g, '<br/>')}
			</div>
		</div>
	`;
};

export const validateRequest = (body: Partial<IEmailTemplate>): Partial<IEmailTemplate> => {
	const trim = (s: string, len: number) => String(s || '').substring(0, len);
	body = body || {};
	return {
		...body,
		fullName: trim(body.fullName, 100),
		email: trim(body.email, 256),
		message: trim(body.message, 4096)
	};
};

async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
	try {
		const emailData = validateRequest(req.body as IEmailTemplate);
		await sendgrid.send({
			to: 'aboutmelsloop@gmail.com',
			from: {
				email: 'contact@melsloop.com', // must be an email registered with sendgrid
				name: `${emailData.fullName}`
			},
			subject: `New message from ${emailData.fullName}`,
			html: tpl(emailData as IEmailTemplate)
		});

		res.status(200).json({ ...req.body });
	} catch (error) {
		console.warn('sendgrid error');
		return res.status((error.statusCode as number) || 500).json({ error: error.message });
	}

	return res.status(200).json({ error: '' });
}

export default sendEmail;
