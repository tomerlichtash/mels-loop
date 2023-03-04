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
				const body = (ctx.request as any).body;
				const { article } = body as { article: DB_MODELS.IArticleData };
				if (!article || typeof article !== "object") {
					ctx.status = 500;
					ctx.body = { error: "data should be an object with an article field containing the article" };
					return;
				}

				const saved = await this._dbService.saveData({
					table: "articles",
					data: article
				})
				ctx.status = 200;
				ctx.body = {
					ok: Boolean(saved.data),
					error: saved.error
				}
			})

			router.get("/save/:filePath", async (ctx: Context) => {
				const filePath: string = ctx.params.filePath || "";

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
				}
			});

			router.get("/load/:filePath", async (ctx: Context) => {
				const filePath: string = ctx.params.filePath || "";

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
				}
			});

			router.get("/terminate", async (ctx: Context) => {
				setTimeout(() => {
					process.exit(0);
				});
				const message = "DB Server terminating";
				console.log(message);
				ctx.status = 200;
				ctx.body = {
					ok: true,
					message
				}
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
		const errors = await testDB(app.port);
		if (errors.length) {
			console.warn("Test errors: ", errors.join('\n'));
		}
	})
	.catch(err => { console.error(`ML DB App failed: ${err}`); process.exit(1); });