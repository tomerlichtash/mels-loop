"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServerDB = void 0;
const dev_mode_1 = require("rxdb/plugins/dev-mode");
const update_1 = require("rxdb/plugins/update");
const memory_1 = require("rxdb/plugins/memory");
const json_dump_1 = require("rxdb/plugins/json-dump");
const rxdb_1 = require("rxdb");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const article_schema_1 = require("../schemas/article.schema");
const label_schema_1 = require("../schemas/label.schema");
const db_utils_1 = require("../common/db-utils");
const ml_utils_1 = require("../../lib/ml-utils");
const INDEX_RE = /index\.[^\/]+$/;
const LABEL_RE = /^[a-z][0-9a-z_,\-\.]+$/i;
const LOCALE_RE = /^[a-z]{2}(:?-[a-z]{2,3})?$/i;
function isIndex(name) {
    return INDEX_RE.test(name);
}
function isValidLabel(label) {
    return LABEL_RE.test(label);
}
function isValidLocale(locale) {
    return LOCALE_RE.test(locale);
}
async function createDB({ name, collections: schemas }) {
    const db = await (0, rxdb_1.createRxDatabase)({
        name,
        storage: (0, memory_1.getRxStorageMemory)()
        // getRxStorageDexie({
        // 	indexedDB: indexedDB,
        // 	IDBKeyRange: IDBKeyRange
        // })
    });
    for (let schema of schemas || []) {
        await db.addCollections(Object.assign({}, schema));
    }
    return db;
}
class ServerDBService {
    constructor(options) {
        this._db = null;
        this._transactionQueue = [];
        this.options = Object.assign({}, options);
    }
    async init() {
        if (this._db) {
            throw new Error("db service already initialized");
        }
        try {
            (0, rxdb_1.addRxPlugin)(dev_mode_1.RxDBDevModePlugin);
            (0, rxdb_1.addRxPlugin)(json_dump_1.RxDBJsonDumpPlugin);
            (0, rxdb_1.addRxPlugin)(update_1.RxDBUpdatePlugin);
            // const db = new Dexie("MyDatabase", { indexedDB: indexedDB, IDBKeyRange: IDBKeyRange });
            this._db = await createDB({
                name: "ml",
                collections: [article_schema_1.ArticleSchema, label_schema_1.LabelSchema]
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
            // windows path, if necessary
            filePath = filePath.replace(/\/(c|d|e)\//i, "$1:\\");
            const dump = await ((_a = this._db) === null || _a === void 0 ? void 0 : _a.exportJSON());
            const db = {
                schemas: [article_schema_1.ArticleSchema, label_schema_1.LabelSchema],
                data: dump || {}
            };
            const fsp = path_1.default;
            const _fs = fs_1.default;
            const osPath = path_1.default.resolve(filePath);
            await fs_1.default.promises.writeFile(osPath, JSON.stringify(db));
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
                name: "test"
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit any
            await (0, db_utils_1.importDBData)({ db: db, dump: snapshot, loadData: true });
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
    async saveLabel(data) {
        if (!isValidLabel(data === null || data === void 0 ? void 0 : data.label) || !Array.isArray(data.articles) || !data.articles.length) {
            return {
                error: `data must include a valid label and at least one page url.\nReceived ${data === null || data === void 0 ? void 0 : data.label} ${data.articles}`,
                data: null
            };
        }
        try {
            const db = this._db;
            const current = await this._db.collections.labels.findOne(data.label).exec();
            if (current) {
                // merge articles
                const updateData = {
                    articles: Object.keys(ml_utils_1.mlUtils.stringArraysToMap(current.articles, data.articles)).sort()
                };
                // protect agains stale docs
                await this.addTransaction(db.collections.labels.findOne(data.label).exec()
                    .then((doc) => doc.atomicPatch(updateData)));
            }
            else {
                await this.addTransaction(this.saveData({
                    table: "labels",
                    data: {
                        id: data.label,
                        articles: data.articles.sort()
                    }
                }));
            }
            return {
                error: "",
                data: current
            };
        }
        catch (err) {
            return {
                error: String(err),
                data: null
            };
        }
    }
    async saveArticle(data) {
        var _a;
        if (!(data === null || data === void 0 ? void 0 : data.path) || !isValidLocale(data.locale)) {
            return {
                error: `data must include the article path and a valid locale (e.g. 'en')\nReceived ${data === null || data === void 0 ? void 0 : data.path}, ${data === null || data === void 0 ? void 0 : data.locale}`,
                data: null
            };
        }
        try {
            const origPath = String(data.path), db = this._db;
            const url = /\/$/.test(origPath) ?
                origPath.slice(0, -1) // if it ends with /, save all but last
                : isIndex(origPath) ? // if it's the url of an index file, the path is the folder, otherwise the full path
                    path_1.default.dirname(origPath)
                    : origPath;
            const article = {
                url: url,
                labels: (data.labels || []).filter(isValidLabel).sort(),
                locales: [data.locale],
                startDate: data.startDate,
                endDate: data.endDate
            };
            const current = await this._db.collections.articles.findOne(url).exec();
            if (current) {
                // merge articles, no validation since we assume the db data is valid and `article` has been validated
                const updateData = {
                    labels: Object.keys(ml_utils_1.mlUtils.stringArraysToMap(current.labels, article.labels))
                        .sort(),
                    locales: Object.keys(ml_utils_1.mlUtils.stringArraysToMap(current.locales, article.locales))
                        .sort(),
                    startDate: typeof article.startDate === "number" ? article.startDate : current.startDate,
                    endDate: typeof article.endDate === "number" ? article.endDate : current.endDate,
                };
                // protect agains stale docs
                await this.addTransaction(db.collections.articles.findOne(url).exec()
                    .then((doc) => doc.atomicPatch(updateData)));
            }
            else {
                await this.addTransaction(this.saveData({
                    table: "articles",
                    data: article
                }));
            }
            if ((_a = data.labels) === null || _a === void 0 ? void 0 : _a.length) {
                for (const label of data.labels.filter(isValidLabel)) {
                    await this.saveLabel({
                        articles: [url],
                        label
                    });
                }
            }
            return {
                error: "",
                data: current
            };
        }
        catch (err) {
            return {
                error: String(err),
                data: null
            };
        }
    }
    async saveData(options) {
        var _a;
        const table = (_a = this._db) === null || _a === void 0 ? void 0 : _a.collections[options.table];
        if (!table) {
            return {
                error: `save to db: table ${options.table} not found`,
                data: null
            };
        }
        const doc = await table.insert(options.data);
        const result = doc && doc.toJSON ? doc.toJSON() : null;
        return {
            data: result,
            error: result ? "" : "Failed to insert"
        };
    }
    async addTransaction(promise) {
        const runNext = async () => {
            if (this._transactionQueue.length) {
                const next = this._transactionQueue.shift();
                try {
                    const value = await next.originalPromise;
                    next.resolve(value);
                }
                catch (e) {
                    throw e;
                }
                finally {
                    runNext();
                }
            }
        };
        const wrapper = new Promise(async (resolve, reject) => {
            this._transactionQueue.push({
                originalPromise: promise,
                resolve
            });
            runNext();
        });
        return wrapper;
    }
}
const createServerDB = (options) => {
    return new ServerDBService(options);
};
exports.createServerDB = createServerDB;
//# sourceMappingURL=db-service.js.map