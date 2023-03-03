import http from "http";
import TestData from "./test-data.json";
import fsPath from "path";

interface IRequestOptions {
    method: string;
    data: object | null;
    url: string;
}

interface IResponse {
    data: object | null;
    error: string;
}

function getServerData({
    data, url, method
}: IRequestOptions): Promise<IResponse> {
    const json = data ? JSON.stringify(data) : "";
    const options = {
        method,
        headers: method === "GET" ? undefined : {
            'Content-Type': 'application/json',
            'Content-Length': json.length,
        },
    };

    return new Promise((resolve: (response: IResponse) => unknown) => {
        const data: string[] = [];
        const req = http.request(url, options, (res) => {
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
                    })
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
    .catch (e => {
        return {
            data: null,
            error: String(e)
        }
    });
}

class TestDBServer {
    constructor(private readonly prefix: string) {

    }

    public async test(): Promise<string[]> {
        const errors: string[] = [];
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

    private async testPutArticle(): Promise<string> {
        const response = await getServerData({
            data: {
                article: {
                    ...TestData.ARTICLE1, 
                    startDate: Date.now()
                }
            },
            url: this.makeURL("article"),
            method: "PUT"
        });
        console.log("post article result", response.data);
        return response.error || "";
    }

    private async testConnect(): Promise<string> {
        const response = await getServerData({
            data: null,
            url: this.makeURL("connect"),
            method: "GET"
        });
        console.log("connect response", response.data);
        return response.error || "";

    }

    private async testSave(): Promise<string> {
        const filePath = fsPath.resolve(__dirname, "../../../../temp/dump.json");
        const response = await getServerData({
            data: null,
            url: this.makeURL(`save/${encodeURIComponent(filePath)}`),
            method: "GET"
        });
        console.log("save response", response.data);
        return response.error || "";

    }

    private async testLoad(): Promise<string> {
        const filePath = fsPath.resolve(__dirname, "../../../../temp/dump.json");
        const response = await getServerData({
            data: null,
            url: this.makeURL(`load/${encodeURIComponent(filePath)}`),
            method: "GET"
        });
        console.log("save response", response.data);
        return response.error || "";

    }

    private makeURL(path: string): string {
        return `${this.prefix}/${path}`;
    }
}

export const testDB = async (port: number) => {
    const test = new TestDBServer(`http://localhost:${port}`);
    return test.test();
}