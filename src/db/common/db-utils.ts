/* eslint  @typescript-eslint/no-explicit-any: 0 */

// Some RxDB types are either complicated or obscure enough to justify
// casting some parameters as any

import { RxDatabase } from "rxdb";
import { DB_SERVICE_MODELS } from "../models/index.d";

export interface IImportDBOptions {
	db: RxDatabase;
	dump: DB_SERVICE_MODELS.IDBDump;
	loadData?: boolean;
}

function processDBDump(db: RxDatabase, data: DB_SERVICE_MODELS.IDBDataRecord): DB_SERVICE_MODELS.IDBDataRecord {
	const processed: DB_SERVICE_MODELS.IDBDataRecord = {
		...data,
		collections: data.collections.map(c => {
			const dbCollection = db.collections[c.name];
			if (dbCollection) {
				c.schemaHash = dbCollection.schema.hash;
			}
			else {
				console.warn(`Missing schema for imported collection ${c.name}`);
			}
			return c;
		})
	}


	return processed;
}

/**
 * Changes the data IN PLACE
 * 
 * Creates a db dump with collecton schema hashes matching the schema hashes of the provided database,
 * then optionally imports the data to a rxdb
 * 
 * Will throw if anything goes wrong
 * @param db 
 * @param dump 
 */
export async function importDBData({ db, dump, loadData } : IImportDBOptions): Promise<RxDatabase> {
	for (let schema of dump.schemas || []) {
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		await db.addCollections(schema as any);
	}
	const importData = processDBDump(db, dump.data);
	if (loadData) {
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		await db.importJSON(importData as any);
	}
	return db;
}