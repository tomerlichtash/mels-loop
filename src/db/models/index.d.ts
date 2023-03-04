/* eslint  @typescript-eslint/no-unused-vars: 0 */
export namespace DB_MODELS {
	interface IArticleData {
		readonly path: string;
		readonly labels: string[];
		readonly startDate: number;
		readonly endDate: number;
	}

	interface IArticle extends IArticleData {
		readonly _meta: object;
	}

	interface ILabelData {
		readonly labels: string[];
		readonly articles: string[];
	}

	interface ILabel extends ILabelData {
		readonly id: string;
	}
}

export namespace DB_SERVICE_MODELS {
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

	interface IDBDump {
		schemas: ISchemaRecord[];
		data: IDBDataRecord;
	}
}

