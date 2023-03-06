import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { getRxStorageMemory } from "rxdb/plugins/memory";

import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump';
import { createRxDatabase, RxDatabase, addRxPlugin, RxDocument } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import fs from "fs";
import fsPath, { resolve } from "path";

import { ArticleSchema } from "../schemas/article.schema";
import { indexedDB, IDBKeyRange } from "fake-indexeddb";
import { importDBData } from "../common/db-utils";

import { DB_MODELS, DB_SERVICE_MODELS } from '../models';
import { mlUtils } from "../../lib/ml-utils";

export interface IDBOptions {
	schema?: string;
}

export interface IDBResponse<T> {
	data: T | null;
	error: string;
}


const INDEX_RE = /index\.[^\/]+$/;
function isIndex(name: string): boolean {
	return INDEX_RE.test(name);
}


export interface IDBService {
	init(): Promise<boolean>;
	saveArticle(data: DB_SERVICE_MODELS.IArticleData): Promise<IDBResponse<DB_MODELS.IArticle>>;
	saveLabel(data: DB_SERVICE_MODELS.ILabelData): Promise<IDBResponse<DB_MODELS.ILabel>>;

	/**
	 * dumps the db to a file
	 * Returns the error message or empty string
	 * @param filePath 
	 */
	saveToFile(filePath: string): Promise<string>;

	loadFromFile(filePath: string): Promise<IDBResponse<RxDatabase>>;
}

interface ICreateDBOptions {
	readonly name: string;
	readonly collections?: Array<any>; // actual type too complex
}

interface IDBInsertTransaction {
	table: string;
	data: object;
}

interface IDBUpdateTransaction {
	id: string;
	table: string;
	data: object;
}

type IDBTransaction = IDBInsertTransaction | IDBUpdateTransaction;

async function createDB({ name, collections: schemas }: ICreateDBOptions): Promise<RxDatabase> {
	const db = await createRxDatabase({
		name,
		storage: getRxStorageMemory()		
		// getRxStorageDexie({
		// 	indexedDB: indexedDB,
		// 	IDBKeyRange: IDBKeyRange
		// })
	});
	for (let schema of schemas || []) {
		await db.addCollections({ ...schema });
	}

	return db;
}

interface ITransactionRecord {
	originalPromise: Promise<any>;
	resolve: (value: any) => any;
}
class ServerDBService implements IDBService {
	private readonly options: IDBOptions;
	private _db: RxDatabase | null = null;
	private readonly _transactionQueue: ITransactionRecord[] = [];

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
			addRxPlugin(RxDBUpdatePlugin);

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

	saveLabel(data: DB_SERVICE_MODELS.ILabelData): Promise<IDBResponse<DB_MODELS.ILabel>> {
		throw new Error('Method not implemented.');
	}

	public async saveArticle(data: DB_SERVICE_MODELS.IArticleData): Promise<IDBResponse<DB_MODELS.IArticle>> {
		if (!data?.path || !data.locale) {
			return {
				error: "data must include path,locale field",
				data: null
			}
		}
		// TODO perhaps treat only index.*.md as an indication for a cluster of files
		try {
			const origPath = String(data.path),
				db = this._db!;

			const url = /\/$/.test(origPath) ?
				origPath.slice(0, -1) // all but last
				: isIndex(origPath)?
					fsPath.dirname(origPath)
					: origPath;
			const article: Partial<DB_MODELS.IArticle> = {
				url: url,
				labels: (data.labels || []).sort(),
				locales: [data.locale],
				startDate: data.startDate,
				endDate: data.endDate
			}
			const current = await this._db!.collections.articles.findOne(url).exec() as RxDocument<DB_MODELS.IArticle>;
			if (!current) {
				return this.addTransaction(this.saveData({
					table: "articles",
					data: article
				}));
			};
			// merge articles
			const updateData = {
				labels: Object.keys(mlUtils.stringArraysToMap(current.labels, article.labels!)).sort(),
				locales: Object.keys(mlUtils.stringArraysToMap(current.locales, article.locales!)).sort(),
				startDate: typeof article.startDate === "number" ? article.startDate : current.startDate,
				endDate: typeof article.endDate === "number" ? article.endDate : current.endDate,
			};
			// protect agains stale docs
			const updated = await this.addTransaction(db.collections.articles.findOne(url).exec()
				.then((doc: RxDocument<DB_MODELS.IArticle>) => doc.atomicPatch(updateData)));
			return {
				error: "",
				data: current
			}

		}
		catch (err) {
			return {
				error: String(err),
				data: null
			}
		}

	}


	private async saveData<TKey extends DB_MODELS.DBCollectionNames, TData, TResult = TData>(options: {
		table: TKey;
		data: TData;
	}): Promise<IDBResponse<TResult>> {
		const table = this._db?.collections[options.table];
		if (!table) {
			return {
				error: `save to db: table ${options.table} not found`,
				data: null
			}
		}
		const doc = await table.insert(options.data as any);
		const result = doc && doc.toJSON ? doc.toJSON() : null
		return {
			data: result,
			error: result ? "" : "Failed to insert"
		}
	}

	private async addTransaction<T>(promise: Promise<T>): Promise<T> {
		const runNext= async () => {
			if (this._transactionQueue.length) {
				const next = this._transactionQueue.shift() as ITransactionRecord;
				try {
					const value = await next.originalPromise;
					next.resolve(value);
				}
				catch(e) {
					throw e;
				}
				finally {
					runNext();
				}
			}
		}
		const wrapper = new Promise<T>(async (resolve, reject) => {
			this._transactionQueue.push({
				originalPromise: promise,
				resolve
			});
			runNext();
		}) 
		return wrapper;
	}
}

export const createServerDB = (options: IDBOptions): IDBService => {
	return new ServerDBService(options);
}