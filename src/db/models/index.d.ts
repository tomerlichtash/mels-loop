/* eslint  @typescript-eslint/no-unused-vars: 0 */
export namespace DB_MODELS {
	interface IBaseArticleData {
		readonly labels: string[];
		readonly startDate: number;
		readonly endDate: number;
	}

	type DBCollectionNames = "articles" | "labels";

	interface IArticle extends IBaseArticleData {
		/**
		 * The relative url of the article e.g. /docs/the-story-of-mel/codex, no trailing slash
		 */
		readonly url: string;
		readonly locales: string[];
		readonly _meta: object;
	}


	interface ILabel {
		readonly id: string;
		readonly artices: string[];
	}
}

export namespace DB_SERVICE_MODELS {
	/**
	 * The data provide to the save api
	 */
	interface IArticleData extends DB_MODELS.IBaseArticleData {
		/**
		 * The full path of the document (including the file name).
		 * 
		 * If you want to provide the folder, terminate the path with `/`
		 */
		readonly path: string;
		readonly locale: string;
	}

	/**
	 * Data provide to the save api
	 */
	interface ILabelData {
		readonly labels: string[];
		readonly articles: string[];
	}


	interface ISchemaRecord {
		[name: string]: { schema: object }
	}

	interface ICollectionRecord {
		name: string;
		schemaHash: string;
		docs: object[];
	}

	interface IDBDataRecord {
		name: string;
		collections: ICollectionRecord[];
	}

	/**
	 * Format saved by the db-service and read by the client-db-service
	 */
	interface IDBDump {
		schemas: ISchemaRecord[];
		data: IDBDataRecord;
	}
}

