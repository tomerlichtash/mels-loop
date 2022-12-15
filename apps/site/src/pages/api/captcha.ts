import { NextApiRequest, NextApiResponse } from "next";

async function validateCaptcha(req: NextApiRequest, res: NextApiResponse) {
	try {
		await fetch("https://www.google.com/recaptcha/api/siteverify", {
			body: JSON.stringify({ value: req.body.value }),
			method: "POST",
		});
	} catch (error) {
		return res
			.status((error.statusCode as number) || 500)
			.json({ error: error.message });
	}
	return res.status(200).json({ error: "" });
}

export default validateCaptcha;
