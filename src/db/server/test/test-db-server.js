"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDB = void 0;
const http_1 = __importDefault(require("http"));
const test_data_json_1 = __importDefault(require("./test-data.json"));
function getServerData({ data, url, method }) {
    const json = data ? JSON.stringify(data) : "";
    const options = {
        method,
        headers: method === "GET" ? undefined : {
            'Content-Type': 'application/json',
            'Content-Length': json.length,
        },
    };
    return new Promise((resolve) => {
        const data = [];
        const req = http_1.default.request(url, options, (res) => {
            // console.log(`STATUS: ${res.statusCode}`);
            // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                data.push(String(chunk));
            });
            res.on('end', () => {
                try {
                    resolve({
                        error: "",
                        data: JSON.parse(data.join(''))
                    });
                }
                catch (e) {
                    resolve({
                        data: null,
                        error: String(e)
                    });
                }
            });
        });
        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
            resolve({
                error: String(e),
                data: null
            });
        });
        // Write data to request body
        json && req.write(json);
        req.end();
    })
        .catch(e => {
        return {
            data: null,
            error: String(e)
        };
    });
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
        console.log("post article result", response.data);
        return response.error || "";
    }
    async testConnect() {
        const response = await getServerData({
            data: null,
            url: this.makeURL("connect"),
            method: "GET"
        });
        console.log("connect response", response.data);
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