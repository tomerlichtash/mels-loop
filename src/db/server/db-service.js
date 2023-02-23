"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServerDB = void 0;
const rxdb_1 = require("rxdb");
const dexie_1 = require("rxdb/plugins/dexie");
const article_schema_1 = require("../schemas/article.schema");
const fake_indexeddb_1 = require("fake-indexeddb");
const rxdb_2 = require("rxdb");
const dev_mode_1 = require("rxdb/plugins/dev-mode");
class ServerDBService {
    constructor(options) {
        this._db = null;
        this.options = Object.assign({}, options);
    }
    async init() {
        if (this._db) {
            throw new Error("db service already initialized");
        }
        try {
            (0, rxdb_2.addRxPlugin)(dev_mode_1.RxDBDevModePlugin);
            // const db = new Dexie("MyDatabase", { indexedDB: indexedDB, IDBKeyRange: IDBKeyRange });
            this._db = await (0, rxdb_1.createRxDatabase)({
                name: "ml",
                storage: (0, dexie_1.getRxStorageDexie)({
                    indexedDB: fake_indexeddb_1.indexedDB,
                    IDBKeyRange: fake_indexeddb_1.IDBKeyRange
                })
            });
            const added = await this._db.addCollections({
                "articles": {
                    schema: article_schema_1.ArticleSchema
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
    async save(options) {
        var _a;
        const table = (_a = this._db) === null || _a === void 0 ? void 0 : _a.collections[options.table];
        if (table) {
        }
        else {
            throw new Error(`save to db: table ${options.table} not found`);
        }
        const ret = await table.upsert(options.data);
        return ret;
    }
}
const createServerDB = (options) => {
    return new ServerDBService(options);
};
exports.createServerDB = createServerDB;
//# sourceMappingURL=db-service.js.map