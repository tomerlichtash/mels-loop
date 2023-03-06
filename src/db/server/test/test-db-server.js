"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDB = void 0;
const test_data_json_1 = __importDefault(require("./test-data.json"));
const path_1 = __importDefault(require("path"));
const node_utils_1 = require("../../../lib/node-utils");
async function getServerData(options) {
    const df = (0, node_utils_1.createDataFetcher)();
    return df.fetchJSON(options);
}
class TestDBServer {
    constructor(prefix, clientId) {
        this.prefix = prefix;
        this.clientId = clientId;
    }
    async test() {
        const errors = [];
        let err = await this.testConnect();
        errors.push(err);
        err = await this.testPutArticles();
        errors.push(err);
        err = await this.testSave();
        errors.push(err);
        if (!err) {
            err = await this.testLoad();
        }
        return errors.filter(Boolean);
    }
    async testPutArticles() {
        let response = await getServerData({
            query: this.queryObject,
            data: {
                article: Object.assign(Object.assign({}, test_data_json_1.default.ARTICLE1), { locale: "en", startDate: Date.now() })
            },
            url: this.makeURL("article"),
            method: "PUT"
        });
        if (response.error) {
            return response.error;
        }
        const promises = [];
        const url = this.makeURL("article"), query = this.queryObject;
        for (let i = 0; i < 20; ++i) {
            promises.push(getServerData({
                query,
                data: {
                    article: Object.assign(Object.assign({}, test_data_json_1.default.ARTICLE1), { locale: "lang-" + i, labels: ["label-" + i], startDate: Date.now() })
                },
                url,
                method: "PUT"
            }));
        }
        const responses = await Promise.all(promises);
        return responses.map(r => r === null || r === void 0 ? void 0 : r.error).filter(Boolean).join(',');
    }
    async testConnect() {
        let response = await getServerData({
            data: null,
            url: this.makeURL("ping"),
            method: "GET"
        });
        if (this.clientId && !response.error) {
            return "Should not reply to ping without correct client id";
        }
        response = await getServerData({
            query: {
                client: "!:TLKE"
            },
            data: null,
            url: this.makeURL("ping"),
            method: "GET"
        });
        if (!response.error) {
            return "Should not reply to ping with bad client id";
        }
        response = await getServerData({
            query: this.queryObject,
            data: null,
            url: this.makeURL("ping"),
            method: "GET"
        });
        return response.error || "";
    }
    get queryObject() {
        return this.clientId ? {
            client: this.clientId
        } : undefined;
    }
    async testSave() {
        const filePath = path_1.default.resolve(__dirname, "../../../../temp/dump.json");
        const response = await getServerData({
            query: this.queryObject,
            data: null,
            url: this.makeURL(`save/${encodeURIComponent(filePath)}`),
            method: "GET"
        });
        return response.error || "";
    }
    async testLoad() {
        const filePath = path_1.default.resolve(__dirname, "../../../../temp/dump.json");
        const response = await getServerData({
            query: this.queryObject,
            data: null,
            url: this.makeURL(`load/${encodeURIComponent(filePath)}`),
            method: "GET"
        });
        return response.error || "";
    }
    makeURL(path) {
        return `${this.prefix}/${path}`;
    }
}
const testDB = async (port, clientId) => {
    const test = new TestDBServer(`http://localhost:${port}`, clientId);
    return test.test();
};
exports.testDB = testDB;
//# sourceMappingURL=test-db-server.js.map