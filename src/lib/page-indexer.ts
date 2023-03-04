import { IParsedPageData } from "../interfaces/models";
import { DB_MODELS } from "../db/models/index.d"
import { createDataFetcher } from "./node-utils";

export interface IPageIndexer {
	/**
	 * Returns an error string, "" if no error
	 * @param page 
	 */
	indexPage(page: IParsedPageData): Promise<string>;

}


export interface IPageIndexerOptions {
	url: string;
}

const DEFAULT_INDEXER_OPTIONS: IPageIndexerOptions = {
	url: `http://localhost:11012`
};

class PageIndexer implements IPageIndexer {
	private readonly _serverURL: string;
	constructor(private options: IPageIndexerOptions) {
		this._serverURL = options.url;
	}

	public async indexPage(page: IParsedPageData): Promise<string> {
		console.log(`Content indexer processing ${page.path}`);
		const article: Partial<DB_MODELS.IArticleData> = {
			startDate: 0,
			path: page.path,
			labels: []
		}
		const df = createDataFetcher();
		const result = await df.fetchJSON({
			method: "PUT",
			url: `${this.options.url}/article`,
			data: { article }
		});
		return result.error;
	}
}

export const createPageIndexer = (options: Partial<IPageIndexerOptions>): IPageIndexer => {
	return new PageIndexer({
		...DEFAULT_INDEXER_OPTIONS,
		...options
	});
}