import Koa from "koa";
import { Context } from "koa";
import * as KoaRouter from "koa-router";
import { createServerDB, IDBService } from "./db-service";
import { DB_MODELS } from "../models";
import { testDB } from "./test/test-db-server";

const Router = require("@koa/router");
const KoaJSON = require("koa-json");
const KoaBodyParser = require("koa-body-parser");


class MLDBApp {
	private readonly _app: Koa;
	private readonly _dbService: IDBService;

	constructor() {
		this._app = new Koa();
		this._app.use(KoaJSON());
		this._app.use(KoaBodyParser());
		this._dbService = createServerDB({});
	}


	public get port(): number {
		return this._port;
	}

	private _port: number = 0;

	public async run(): Promise<string> {
		try {
			const inited = await this._dbService.init();
			if (!inited) {
				return ("failed to init db");
			}
			const router: KoaRouter = new Router();
			router.get("/connect", (ctx: Context) => {
				ctx.body = { ok: true };
			});

			router.put("/article", async (ctx: Context) => {
				const body = (ctx.request as any).body,
					req = ctx.req;
				const { article } = body as { article: DB_MODELS.IArticleData };
				if (!article || typeof article !== "object") {
					ctx.status = 500;
					ctx.body = { error: "data should be an object with an article field containing the article" };
					return;
				}

				const saved = await this._dbService.save({
					table: "articles",
					data: article
				})
			})

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
		const errors = await testDB(app.port);
		console.log("Test errors", errors.join('\n'))
	})
	.catch(err => console.error(`ML DB App failed: ${err}`));