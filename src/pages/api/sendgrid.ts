import sendgrid from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export interface IEmailTemplate extends NextApiRequest {
	fullname: string;
	email: string;
	message: string;
}

const tpl = ({ fullname, email, message }: IEmailTemplate) => {
	return `<div><ul><li>Name:<br/><strong>${fullname}</strong></li><li>Email:<br/><em>${email}</em></li></ul>${message.replace(
		/\n/g,
		"<br/>"
	)}</div>`;
};

const validateRequest = (body: IEmailTemplate): Partial<IEmailTemplate> => {
	const trim = (s: string, len: number) => String(s || "").substring(len);

	return {
		fullname: trim(body?.fullname, 100),
		email: trim(body?.email, 256),
		message: trim(body?.message, 4096)
	}
}

async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
	try {
		const emailData = validateRequest(req.body as IEmailTemplate);
		await sendgrid.send({
			to: "aboutmelsloop@gmail.com",
			from: "hello@melsloop.com",
			subject: `[New Message] From: ${emailData.fullname}`,
			html: tpl(emailData as IEmailTemplate),
		});
	} catch (error) {
		return res
			.status((error.statusCode as number) || 500)
			.json({ error: error.message });
	}

	return res.status(200).json({ error: "" });
}

export default sendEmail;
