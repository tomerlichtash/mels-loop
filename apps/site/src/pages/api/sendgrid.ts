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

async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
	try {
		await sendgrid.send({
			to: "aboutmelsloop@gmail.com",
			from: "hello@melsloop.com",
			subject: `[New Message] From: ${req.body.fullname as string}`,
			html: tpl(req.body as IEmailTemplate),
		});
	} catch (error) {
		return res
			.status((error.statusCode as number) || 500)
			.json({ error: error.message });
	}

	return res.status(200).json({ error: "" });
}

export default sendEmail;
