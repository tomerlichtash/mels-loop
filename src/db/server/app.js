"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_body_1 = require("koa-body");
const http_1 = __importDefault(require("http"));
const process_argv_1 = __importDefault(require("process.argv"));
const db_service_1 = require("./db-service");
const test_db_server_1 = require("./test/test-db-server");
// no ts declaration
const Router = require("@koa/router");
const KoaJSON = require("koa-json");
class MLDBApp {
    constructor() {
        this._port = 0;
        // if present, 
        this._clientId = "";
        this._app = new koa_1.default();
        this._app.use(KoaJSON());
        this._app.use((0, koa_body_1.koaBody)());
        this._dbService = (0, db_service_1.createServerDB)({});
    }
    get port() {
        return this._port;
    }
    async run(options) {
        try {
            this._clientId = options.client || "";
            const inited = await this._dbService.init();
            if (!inited) {
                return ("failed to init db");
            }
            const router = new Router();
            router.use(async (ctx, next) => {
                var _a;
                if (!this.validateRequest(ctx)) {
                    console.warn(`Rejecting request ${(_a = ctx.URL) === null || _a === void 0 ? void 0 : _a.href}, ${ctx.query.client} != ${this._clientId || "<no id>"}`);
                    return false;
                }
                return await next();
            });
            router.get("/ping", (ctx) => {
                ctx.body = { error: "" };
            });
            router.put("/article", async (ctx) => {
                const body = ctx.request.body;
                const { article } = body;
                if (!article || typeof article !== "object") {
                    ctx.status = 500;
                    ctx.body = { error: "data should be an object with an article field containing the article" };
                    return;
                }
                try {
                    const saved = await this._dbService.saveArticle(article);
                    ctx.status = 200;
                    ctx.body = {
                        article: saved.data,
                        error: saved.error
                    };
                }
                catch (err) {
                    ctx.status = 500;
                    ctx.body = { error: String(err) };
                }
            });
            router.get("/save/:filePath", async (ctx) => {
                const filePath = ctx.params.filePath || "";
                if (!filePath) {
                    ctx.status = 500;
                    ctx.body = { error: "Missing filepath" };
                    return;
                }
                const err = await this._dbService.saveToFile(filePath);
                ctx.status = 200;
                ctx.body = {
                    error: err || ""
                };
            });
            router.get("/load/:filePath", async (ctx) => {
                const filePath = ctx.params.filePath || "";
                if (!filePath) {
                    ctx.status = 500;
                    ctx.body = { error: "Missing filepath" };
                    return;
                }
                const result = await this._dbService.loadFromFile(filePath);
                ctx.status = 200;
                ctx.body = {
                    error: result.error
                };
            });
            router.get("/terminate", async (ctx) => {
                setTimeout(() => {
                    process.exit(0);
                });
                const message = "DB Server terminating";
                console.log(message);
                ctx.status = 200;
                ctx.body = {
                    error: "",
                    message
                };
            });
            this._app.use(router.routes()).use(router.allowedMethods());
            const envPort = options.port || process.env.ML_DB_API_PORT;
            this._port = (envPort && !isNaN(parseInt(envPort))) ?
                parseInt(envPort) : 11012;
            http_1.default.createServer(this._app.callback())
                .listen(this._port)
                .on("error", (err) => {
                if (err.code === 'EADDRINUSE') {
                    console.error(`Port ${this._port} in use, exiting...`);
                    setTimeout(() => process.exit(1), 1);
                }
            });
            // this._app.listen(this._port, (...args: any[]) => {
            // 	console.log(args);
            // });
            return "";
        }
        catch (err) {
            return String(err);
        }
    }
    get clientId() {
        return this._clientId;
    }
    validateRequest(ctx) {
        const clientId = ctx.query.client;
        // != didn't yield good results
        if ((clientId || null) !== (this.clientId || null)) {
            ctx.status = 500;
            ctx.body = { error: `Wrong client id ${clientId}` };
            return false;
        }
        return true;
    }
}
const app = new MLDBApp();
const processArgv = (0, process_argv_1.default)(process.argv.slice(2)), options = processArgv({});
app.run(options)
    .then(async () => {
    console.log(`App listening on port ${app.port}`);
    if (options.test) {
        const errors = await (0, test_db_server_1.testDB)(app.port, app.clientId);
        if (errors.length) {
            console.warn("Test errors: ", errors.join('\n'));
        }
    }
})
    .catch(err => { console.error(`ML DB App failed: ${err}`); process.exit(1); });
//# sourceMappingURL=app.js.map