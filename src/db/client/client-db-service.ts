/* eslint  @typescript-eslint/no-explicit-any: 0 */

// Some RxDB types are either complicated or obscure enough to justify
// casting some parameters as any

import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump';
import { createRxDatabase, RxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";

import { IClientDBService } from "../../interfaces/db-service.d";
import { DB_SERVICE_MODELS } from "../models/index.d";
import { importDBData } from '../common/db-utils';
import { mlUtils } from '../../lib/ml-utils';

enum DBStates {
	None, Loading, Loaded, Error
}

class ClientDBService implements IClientDBService {
	private _db: RxDatabase;
	private _state = DBStates.None;

	constructor() {
		if (mlUtils.appEnvironment.isBrowser) {
			addRxPlugin(RxDBDevModePlugin);
			addRxPlugin(RxDBJsonDumpPlugin);
		}
	}

	public async load(): Promise<string> {
		if (this._state === DBStates.Loading) {
			return"service already loading";
		}
		if (this._state === DBStates.Loaded) {
			return "";
		}
		if (!mlUtils.appEnvironment.isBrowser) {
			this._state = DBStates.Loaded;
			return "";
		}
		this._state = DBStates.Loading;
		let error = "";
		try {
			const url = `/full-db.json`;
			const response = await fetch(url, {
				method: "GET",
			});
			const responseData = await response.json() as DB_SERVICE_MODELS.IDBDump;
			if (responseData?.data && responseData.schemas) {
				error = await this.createDB(responseData);
			}
			else {
				error = "Failed to get or parse DB data";
			}
		}
		catch (e) {
			error = String(e);
		}
		this._state = error ? DBStates.Error : DBStates.Loaded;

		return error ? `Error initializing database ${error}` : "";
	}


	private async createDB(dump: DB_SERVICE_MODELS.IDBDump): Promise<string> {
		try {
			const db = await createRxDatabase({
				name: "db-service",
				storage: getRxStorageMemory()
			});
			for (let schema of dump.schemas || []) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				const added = await db.addCollections(schema as any);
				console.log(added);
			}
			await importDBData( { db, dump, loadData: true });
			// const importData = this.processJSON(db, dump.data);
			// // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			// await db.importJSON(importData as any);
			const all = await db.collections.articles.find().exec();
			console.log(all);

			this._db = db;
			return "";
		}
		catch (e) {
			return String(e);
		}
	}
}

let globalDB: IClientDBService | null = null;

export const createDBService: () => IClientDBService = () => {
	if (!globalDB) {
		globalDB = new ClientDBService();
	}

	return globalDB;
}