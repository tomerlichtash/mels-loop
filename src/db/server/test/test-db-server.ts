import TestData from "./test-data.json";
import fsPath from "path";
import { createDataFetcher, IFetchOptions, IFetchResponse } from "../../../lib/node-utils"

async function getServerData(options: IFetchOptions): Promise<IFetchResponse> {
	const df = createDataFetcher();
	return df.fetchJSON(options);
}

class TestDBServer {
	constructor(private readonly prefix: string) {

	}

	public async test(): Promise<string[]> {
		const errors: string[] = [];
		let err = await this.testConnect();
		errors.push(err);
		err = await this.testPutArticle();
		errors.push(err);
		err = await this.testSave();
		errors.push(err);
		if (!err) {
			err = await this.testLoad();
		}
		return errors.filter(Boolean);

	}

	private async testPutArticle(): Promise<string> {
		const response = await getServerData({
			data: {
				article: {
					...TestData.ARTICLE1,
					startDate: Date.now()
				}
			},
			url: this.makeURL("article"),
			method: "PUT"
		});
		return response.error || "";
	}

	private async testConnect(): Promise<string> {
		const response = await getServerData({
			data: null,
			url: this.makeURL("connect"),
			method: "GET"
		});
		return response.error || "";

	}

	private async testSave(): Promise<string> {
		const filePath = fsPath.resolve(__dirname, "../../../../temp/dump.json");
		const response = await getServerData({
			data: null,
			url: this.makeURL(`save/${encodeURIComponent(filePath)}`),
			method: "GET"
		});
		return response.error || "";

	}

	private async testLoad(): Promise<string> {
		const filePath = fsPath.resolve(__dirname, "../../../../temp/dump.json");
		const response = await getServerData({
			data: null,
			url: this.makeURL(`load/${encodeURIComponent(filePath)}`),
			method: "GET"
		});
		return response.error || "";

	}

	private makeURL(path: string): string {
		return `${this.prefix}/${path}`;
	}
}

export const testDB = async (port: number) => {
	const test = new TestDBServer(`http://localhost:${port}`);
	return test.test();
}