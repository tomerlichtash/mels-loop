"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataFetcher = void 0;
const http_1 = __importDefault(require("http"));
class DataFetcher {
    async fetchJSON({ data, url, method }) {
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
}
const createDataFetcher = () => {
    return new DataFetcher();
};
exports.createDataFetcher = createDataFetcher;
//# sourceMappingURL=node-utils.js.map