"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const db_service_1 = require("./db-service");
const Router = require("@koa/router");
class MLDBApp {
    constructor() {
        this._port = 0;
        this._app = new koa_1.default();
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
                const { article } = ctx.body;
                if (!article || typeof article !== "object") {
                    ctx.status = 500;
                    ctx.body = { error: "data should be an object with an article field containing the article" };
                    return;
                }
                const saved = await this._dbService.save({
                    table: "articles",
                    data: article
                });
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
    .then(() => {
    console.log(`App listening on port ${app.port}`);
})
    .catch(err => console.error(`ML DB App failed: ${err}`));
//# sourceMappingURL=app.js.map