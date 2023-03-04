import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump';
import { createRxDatabase, RxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import fs from "fs";
import fsPath from "path";

import { ArticleSchema } from "../schemas/article.schema";
import { indexedDB, IDBKeyRange } from "fake-indexeddb";
import { importDBData } from "../common/db-utils";

import { DB_MODELS, DB_SERVICE_MODELS } from '../models';

export interface IDBOptions {
	schema?: string;
}

export interface IDBResponse<T> {
	data: T | null;
	error: string;
}

type DBSaveMethod<TKey extends string, TData, TResult> = (options: {
	table: TKey;
	data: TData;
}) => Promise<TResult>;


export interface IDBService {
	init(): Promise<boolean>;
	saveData(options: {
		table: "articles";
		data: DB_MODELS.IArticleData;

	}): Promise<IDBResponse<DB_MODELS.IArticle>>
	saveData(options: {
		table: "labels";
		data: DB_MODELS.ILabelData;

		/**
		 * dumps the db to a file
		 * @param filePath 
		 */
	}): Promise<IDBResponse<DB_MODELS.ILabel>>

	saveToFile(filePath: string): Promise<string>;

	loadFromFile(filePath: string): Promise<IDBResponse<RxDatabase>>;
}

interface ICreateDBOptions {
	readonly name: string;
	readonly collections?: Array<any>; // actual type too complex
}
async function createDB({ name, collections: schemas }: ICreateDBOptions): Promise<RxDatabase> {
	const db = await createRxDatabase({
		name,
		storage: getRxStorageDexie({
			indexedDB: indexedDB,
			IDBKeyRange: IDBKeyRange
		})
	});
	for (let schema of schemas || []) {
		await db.addCollections({ ...schema });
	}

	return db;
}

class ServerDBService implements IDBService {
	private readonly options: IDBOptions;
	private _db: RxDatabase | null = null;

	constructor(options: IDBOptions) {
		this.options = Object.assign({}, options);
	}
	async init(): Promise<boolean> {
		if (this._db) {
			throw new Error("db service already initialized");
		}
		try {
			addRxPlugin(RxDBDevModePlugin);
			addRxPlugin(RxDBJsonDumpPlugin);

			// const db = new Dexie("MyDatabase", { indexedDB: indexedDB, IDBKeyRange: IDBKeyRange });
			this._db = await createDB({
				name: "ml",
				collections: [{
					"articles": {
						schema: ArticleSchema
					}
				}]
			});
			return true;
		}
		catch (err) {
			console.error(`Error initalizing db service ${err}`);
			return false;
		}
	}

	public async saveToFile(filePath: string): Promise<string> {
		try {
			// windows path, if necessary
			filePath = filePath.replace(/\/(c|d|e)\//i, "$1:\\");
			const dump = await this._db?.exportJSON();
			const db = {
				schemas: [
					{ "articles": { schema: ArticleSchema } }
				],
				data: dump || {}
			}
			const fsp = fsPath;
			const _fs = fs;
			const osPath = fsPath.resolve(filePath);
			await fs.promises.writeFile(osPath, JSON.stringify(db));
			return "";
		}
		catch (err) {
			return String(err);
		}
	}

	public async loadFromFile(filePath: string): Promise<IDBResponse<RxDatabase>> {
		try {
			const content = await fs.promises.readFile(filePath);
			if (!content) {
				return {
					data: null,
					error: "no content"
				};
			}
			const snapshot: DB_SERVICE_MODELS.IDBDump = JSON.parse(String(content));
			const db = await createDB({
				name: "test"
			})
// eslint-disable-next-line @typescript-eslint/no-explicit any
			await importDBData({ db: db as any, dump: snapshot, loadData: true })

			return {
				data: db,
				error: ""
			}
		}
		catch (err) {
			console.error(`load db from file: ${err}`);
			return {
				error: String(err),
				data: null
			};
		}
	}


	public async saveData<TKey extends string, TData, TResult>(options: {
		table: TKey;
		data: TData;
	}): Promise<IDBResponse<TResult>> {
		const table = this._db?.collections[options.table];
		if (table) {
			const ret: TResult = await table.upsert(options.data as any);
			return {
				data: ret,
				error: ""
			}
		}
		else {
			return {
				error: `save to db: table ${options.table} not found`,
				data: null
			}
		}
	}
}

export const createServerDB = (options: IDBOptions): IDBService => {
	return new ServerDBService(options);
}