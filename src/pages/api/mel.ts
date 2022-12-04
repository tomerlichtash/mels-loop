import { NextApiRequest, NextApiResponse } from "next";
import { IProcessOptions, osUtils } from "../../lib/os-utils";

interface IMelAPIParam {
	data: string;
}
export default async function handler(_req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const input = _req.query as unknown as IMelAPIParam;
	try {
		const inner = input?.data ? JSON.parse(input.data) : {};
		const params = inner as IProcessOptions;
		if (!params.exe) {
			return res.status(200).json({ error: "missing exe"});
		}
		if (!params.argv) {
			return res.status(200).json({ error: "missing argv"});
		}
		const env = process.env;
		params.argv = params.argv.map(arg => arg.replace(/\$([^\s]+)/, function(match, content) { 
			return (content && env[content]) || match;
		}));
		const output = await osUtils.captureProcessOutput(params);
		res.status(200).json(output);
	}
	catch (e) {
		res.status(200).json({ error: String(e)} );
	}

}
