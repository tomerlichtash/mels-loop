import TestData from "./test-data.json";
import fsPath from "path";
import { createDataFetcher, IFetchOptions, IFetchQuery, IFetchResponse } from "../../../lib/node-utils"
import { DB_MODELS } from "../../models";

async function getServerData<T>(options: IFetchOptions): Promise<IFetchResponse<T>> {
	const df = createDataFetcher();
	return df.fetchJSON(options) as unknown as IFetchResponse<T>;
}

function randomElement<T>(array: T[]): T {
	return array[Math.round(Math.random() * (array.length - 1))];
}

function randomElements<T>(array: T[], size = 0.5): T[] {
	if (array?.length < 2) {
		return array || [];
	}
	const ret: T[] = [];
	size = Math.min(1, Math.max(size, 1/array.length));
	for (let t of array) {
		if (Math.random() <= size) {
			ret.push(t);
		}
	}
	return ret.length ? ret : [ randomElement(array) ];
}


class TestDBServer {
	constructor(private readonly prefix: string, private readonly clientId?: string) {

	}

	public async test(): Promise<string[]> {
		const errors: string[] = [];
		let err = await this.testConnect();
		errors.push(err);
		err = await this.testPutArticles();
		errors.push(err);
		err = await this.testSave();
		errors.push(err);
		if (!err) {
			err = await this.testLoad();
		}
		return errors.filter(Boolean);

	}

	private async testPutArticles(): Promise<string> {
		let response = await getServerData({
			query: this.queryObject,
			data: {
				article: {
					...TestData.ARTICLE1,
					locale: "en",
					startDate: Date.now()
				}
			},
			url: this.makeURL("article"),
			method: "PUT"
		});
		if (response.error) {
			return response.error;
		}

		const promises: Promise<IFetchResponse<DB_MODELS.IArticle>>[] = [];
		const url = this.makeURL("article"),
			query = this.queryObject;
		for (let i = 0; i < 30; ++i) {
			promises.push(getServerData({
				query,
				data: {
					article: {
						...TestData.ARTICLE1,
						path: `/docs/pages/${randomElement([
							"about", "about/index.md", "about/", "about/index.he.md", "about/index.en.md",
							"more", "bio/codex", "bio/codex/index.md", "bio/codex/custom.html"
						])}`,
						locale: randomElement(["he", "en", "fr", "en-notlegal", "not-legal", "n0-tl"]),
						labels: randomElements(["sugar", "#illegal", "a", "ab", "abc", "Fortran"]),
						startDate: Date.now()
					}
				},
				url,
				method: "PUT"
			}));
		}
		const responses = await Promise.all(promises);
		return responses.map(r => r?.error).filter(Boolean).join(',');
	}

	private async testConnect(): Promise<string> {
		let response = await getServerData({
			data: null,
			url: this.makeURL("ping"),
			method: "GET"
		});
		if (this.clientId && !response.error) {
			return "Should not reply to ping without correct client id";
		}
		response = await getServerData({
			query: {
				client: "!:TLKE"
			},
			data: null,
			url: this.makeURL("ping"),
			method: "GET"
		});
		if (!response.error) {
			return "Should not reply to ping with bad client id";
		}
		response = await getServerData({
			query: this.queryObject,
			data: null,
			url: this.makeURL("ping"),
			method: "GET"
		});
		return response.error || "";

	}

	private get queryObject(): IFetchQuery | undefined {
		return  this.clientId ? {
			client: this.clientId
		} : undefined;
	}

	private async testSave(): Promise<string> {
		const filePath = fsPath.resolve(__dirname, "../../../../temp/dump.json");
		const response = await getServerData({
			query: this.queryObject,
			data: null,
			url: this.makeURL(`save/${encodeURIComponent(filePath)}`),
			method: "GET"
		});
		return response.error || "";

	}

	private async testLoad(): Promise<string> {
		const filePath = fsPath.resolve(__dirname, "../../../../temp/dump.json");
		const response = await getServerData({
			query: this.queryObject,
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

export const testDB = async (port: number, clientId: string | undefined) => {
	const test = new TestDBServer(`http://localhost:${port}`, clientId);
	return test.test();
}