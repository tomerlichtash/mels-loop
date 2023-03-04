"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const db_service_1 = require("./db-service");
const test_db_server_1 = require("./test/test-db-server");
const Router = require("@koa/router");
const KoaJSON = require("koa-json");
const KoaBodyParser = require("koa-body-parser");
class MLDBApp {
    constructor() {
        this._port = 0;
        this._app = new koa_1.default();
        this._app.use(KoaJSON());
        this._app.use(KoaBodyParser());
        this._dbService = (0, db_service_1.createServerDB)({});
    }
    get port() {
        return this._port;
    }
    async run() {
        try {
            const inited = await this._dbService.init();
            if (!inited) {
                return ("failed to init db");
            }
            const router = new Router();
            router.get("/connect", (ctx) => {
                ctx.body = { ok: true };
            });
            router.put("/article", async (ctx) => {
                const body = ctx.request.body;
                const { article } = body;
                if (!article || typeof article !== "object") {
                    ctx.status = 500;
                    ctx.body = { error: "data should be an object with an article field containing the article" };
                    return;
                }
                const saved = await this._dbService.saveData({
                    table: "articles",
                    data: article
                });
                ctx.status = 200;
                ctx.body = {
                    ok: Boolean(saved.data),
                    error: saved.error
                };
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
                    ok: !err,
                    error: err || undefined
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
                    ok: Boolean(result.data),
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
                    ok: true,
                    message
                };
            });
            this._app.use(router.routes()).use(router.allowedMethods());
            const envPort = process.env.DB_API_PORT;
            this._port = (envPort && !isNaN(parseInt(envPort))) ?
                parseInt(envPort) : 11012;
            this._app.listen(this._port);
            return "";
        }
        catch (err) {
            return String(err);
        }
    }
}
const app = new MLDBApp();
app.run()
    .then(async () => {
    console.log(`App listening on port ${app.port}`);
    const errors = await (0, test_db_server_1.testDB)(app.port);
    if (errors.length) {
        console.warn("Test errors: ", errors.join('\n'));
    }
})
    .catch(err => { console.error(`ML DB App failed: ${err}`); process.exit(1); });
//# sourceMappingURL=app.js.map