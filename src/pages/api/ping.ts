import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import * as fsPath from "path";

async function testIt() {
	const p = new Promise((resolve => {
		fs.mkdtemp("ml", (err, folder) => {
			if (err) {
				resolve({ error: `mkdtemp error ${String(err)}` })
			}
			const filePath = fsPath.join(folder, "rabak.json");
			fs.writeFile(filePath, JSON.stringify({ name: "maor15" }), (err => {
				if (err) {
					resolve({ error: `write file error ${String(err)}` })
				}
				fs.readFile(filePath, (err, data) => {
					if (err) {
						resolve({ error: `read file error ${String(err)}` })
					}
					resolve(JSON.parse(data.toString()));
				})
			}))
		})
	}));
	try {
		const result = await p;
		return result;
	}
	catch (e) {
		return { error: String(e) }
	}
}

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
	try {
		testIt().then(result => {
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

