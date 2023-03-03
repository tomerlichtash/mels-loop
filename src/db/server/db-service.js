"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServerDB = void 0;
const rxdb_1 = require("rxdb");
const dexie_1 = require("rxdb/plugins/dexie");
const article_schema_1 = require("../schemas/article.schema");
const fake_indexeddb_1 = require("fake-indexeddb");
const rxdb_2 = require("rxdb");
const dev_mode_1 = require("rxdb/plugins/dev-mode");
const json_dump_1 = require("rxdb/plugins/json-dump");
const fs_1 = __importDefault(require("fs"));
async function createDB({ name, collections: schemas }) {
    const db = await (0, rxdb_1.createRxDatabase)({
        name,
        storage: (0, dexie_1.getRxStorageDexie)({
            indexedDB: fake_indexeddb_1.indexedDB,
            IDBKeyRange: fake_indexeddb_1.IDBKeyRange
        })
    });
    for (let schema of schemas || []) {
        const added = await db.addCollections(Object.assign({}, schema));
        console.log(added);
    }
    return db;
}
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
            (0, rxdb_2.addRxPlugin)(json_dump_1.RxDBJsonDumpPlugin);
            // const db = new Dexie("MyDatabase", { indexedDB: indexedDB, IDBKeyRange: IDBKeyRange });
            this._db = await createDB({
                name: "ml",
                collections: [{
                        "articles": {
                            schema: article_schema_1.ArticleSchema
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
    async saveToFile(filePath) {
        var _a;
        try {
            const dump = await ((_a = this._db) === null || _a === void 0 ? void 0 : _a.exportJSON());
            const db = {
                schemas: [
                    { articles: { schema: article_schema_1.ArticleSchema } }
                ],
                data: dump || {}
            };
            await fs_1.default.promises.writeFile(filePath, JSON.stringify(db));
            return "";
        }
        catch (err) {
            return String(err);
        }
    }
    async loadFromFile(filePath) {
        try {
            const content = await fs_1.default.promises.readFile(filePath);
            if (!content) {
                return {
                    data: null,
                    error: "no content"
                };
            }
            const snapshot = JSON.parse(String(content));
            const db = await createDB({
                name: "test",
                collections: snapshot.schemas
            });
            await db.importJSON(snapshot.data);
            return {
                data: db,
                error: ""
            };
        }
        catch (err) {
            console.error(`load db from file: ${err}`);
            return {
                error: String(err),
                data: null
            };
        }
    }
    async saveData(options) {
        var _a;
        const table = (_a = this._db) === null || _a === void 0 ? void 0 : _a.collections[options.table];
        if (table) {
            const ret = await table.upsert(options.data);
            return {
                data: ret,
                error: ""
            };
        }
        else {
            return {
                error: `save to db: table ${options.table} not found`,
                data: null
            };
        }
    }
}
const createServerDB = (options) => {
    return new ServerDBService(options);
};
exports.createServerDB = createServerDB;
//# sourceMappingURL=db-service.js.map