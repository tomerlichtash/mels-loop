import { NextApiRequest, NextApiResponse } from "next";
import { testTempAccess } from "../../lib/api-helpers";



export default function handler(_req: NextApiRequest, res: NextApiResponse) {
	try {
		testTempAccess().then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			res.status(200).json({ error: String(err) });
		})
	}
	catch (e) {
		res.status(200).json({ error: String(e) });
	}
}

