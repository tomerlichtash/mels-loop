import * as fs from "fs";
import { tmpdir } from "os";
import * as fsPath from "path";
import * as tempFiles from "tmp";

const testIt = async() => {
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

const testTemp = async() => {
	const p = new Promise((resolve => {
		tempFiles.file((err, path) => {
			if (err) {
				resolve({ error: `mkdtemp error ${String(err)}` })
			}
			fs.writeFile(path, JSON.stringify({ name: "maor15" }), (err => {
				if (err) {
					resolve({ error: `write file error ${String(err)}` })
				}
				fs.readFile(path, (err, data) => {
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

export const testTempAccess = testTemp;