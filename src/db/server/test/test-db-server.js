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
    constructor(prefix) {
        this.prefix = prefix;
    }
    async test() {
        const errors = [];
        let err = await this.testConnect();
        errors.push(err);
        err = await this.testPutArticle();
        errors.push(err);
        err = await this.testSave();
        errors.push(err);
        if (!err) {
            err = await this.testLoad();
        }
        return errors.filter(Boolean);
    }
    async testPutArticle() {
        const response = await getServerData({
            data: {
                article: Object.assign(Object.assign({}, test_data_json_1.default.ARTICLE1), { startDate: Date.now() })
            },
            url: this.makeURL("article"),
            method: "PUT"
        });
        return response.error || "";
    }
    async testConnect() {
        const response = await getServerData({
            data: null,
            url: this.makeURL("connect"),
            method: "GET"
        });
        return response.error || "";
    }
    async testSave() {
        const filePath = path_1.default.resolve(__dirname, "../../../../temp/dump.json");
        const response = await getServerData({
            data: null,
            url: this.makeURL(`save/${encodeURIComponent(filePath)}`),
            method: "GET"
        });
        return response.error || "";
    }
    async testLoad() {
        const filePath = path_1.default.resolve(__dirname, "../../../../temp/dump.json");
        const response = await getServerData({
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
const testDB = async (port) => {
    const test = new TestDBServer(`http://localhost:${port}`);
    return test.test();
};
exports.testDB = testDB;
//# sourceMappingURL=test-db-server.js.map