import sendgrid from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const tpl = (email: string, message: string) => {
	return `<div><ul><li>Sender: ${email}</li><li>Message: ${message}</li></ul></div>`;
};

async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
	try {
		// console.log("REQ.BODY", req.body);
		await sendgrid.send({
			to: "aboutmelsloop@gmail.com",
			from: "hello@melsloop.com",
			subject: `New Message: ${req.body.subject as string}`,
			html: tpl(req.body.email as string, req.body.message as string),
		});
	} catch (error) {
		// console.log(error);
		return res
			.status((error.statusCode as number) || 500)
			.json({ error: error.message });
	}

	return res.status(200).json({ error: "" });
}

export default sendEmail;
