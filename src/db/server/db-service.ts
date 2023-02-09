import { createRxDatabase, RxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import { ArticleSchema } from "../schemas/article.schema";
import { indexedDB, IDBKeyRange } from "fake-indexeddb";

import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { DB_MODELS } from '../models';


export interface IDBOptions {
    schema?: string;
}

type DBSaveMethod<TKey extends string, TData, TResult> = (options: {
    table: TKey;
    data: TData;
}) => Promise<TResult>;

export interface IDBService {
    init(): Promise<boolean>;
    save(options: {
        table: "articles";
        data: DB_MODELS.IArticleData;

    }): Promise<DB_MODELS.IArticle>
    save(options: {
        table: "labels";
        data: DB_MODELS.IArticleData;

    }): Promise<DB_MODELS.IArticle>
}

class ServerDBService {
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

            // const db = new Dexie("MyDatabase", { indexedDB: indexedDB, IDBKeyRange: IDBKeyRange });
            this._db = await createRxDatabase({
                name: "ml",
                storage: getRxStorageDexie({
                    indexedDB: indexedDB,
                    IDBKeyRange: IDBKeyRange
                })
            });
            const added = await this._db.addCollections({
                "articles": {
                    schema: ArticleSchema
                }
            });
            console.log("add collection result", added);
            return true;
        }
        catch (err) {
            console.error(`Error initalizing db service ${err}`);
            return false;
        }
    }
}

export const createServerDB = (options: IDBOptions): IDBService => {
    return new ServerDBService(options);
}