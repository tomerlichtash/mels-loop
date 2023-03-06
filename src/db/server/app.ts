import Koa, { Next } from "koa";
import { Context } from "koa";
import * as KoaRouter from "koa-router";
import { koaBody } from "koa-body";
import http from "http";
import argv from "process.argv";

import { createServerDB, IDBService } from "./db-service";
import { DB_SERVICE_MODELS } from "../models";
import { testDB } from "./test/test-db-server";

// no ts declaration
const Router = require("@koa/router");
const KoaJSON = require("koa-json");

interface IMLDBOptions {
	client?: string;
	port?: string;
}

interface IMLAppOptions extends IMLDBOptions {
	test: unknown;
}


class MLDBApp {
	private readonly _app: Koa;
	private readonly _dbService: IDBService;

	constructor() {
		this._app = new Koa();
		this._app.use(KoaJSON());
		this._app.use(koaBody());
		this._dbService = createServerDB({});
	}


	public get port(): number {
		return this._port;
	}

	private _port: number = 0;
	// if present, 
	private _clientId = "";

	public async run(options: IMLDBOptions): Promise<string> {
		try {
			this._clientId = options.client || "";
			const inited = await this._dbService.init();
			if (!inited) {
				return ("failed to init db");
			}
			const router: KoaRouter = new Router();
			router.use(async (ctx: Context, next: Next) => {
				if (!this.validateRequest(ctx)) {
					console.warn(`Rejecting request ${ctx.URL?.href}, ${ctx.query.client} != ${this._clientId || "<no id>"}`);
					return false;
				}
				return await next();
			})
			router.get("/ping", (ctx: Context) => {
				ctx.body = { error: "" };
			});

			router.put("/article", async (ctx: Context) => {
				const body = (ctx.request as any).body;
				const { article } = body as { article: DB_SERVICE_MODELS.IArticleData };
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
					}
				}
				catch(err) {
					ctx.status = 500;
					ctx.body = { error: String(err) };
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
					error: err || ""
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
					error: "",
					message
				}
			});

			this._app.use(router.routes()).use(router.allowedMethods());

			const envPort = options.port || process.env.ML_DB_API_PORT;
			this._port = (envPort && !isNaN(parseInt(envPort))) ?
				parseInt(envPort) : 11012;

			http.createServer(this._app.callback())
				.listen(this._port)
				.on("error", (err: (Error & { code: string })) => {
					if (err.code === 'EADDRINUSE') {
						console.error(`Port ${this._port} in use, exiting...`);
						setTimeout(() => process.exit(1), 1);
					}
				})
			// this._app.listen(this._port, (...args: any[]) => {
			// 	console.log(args);
			// });

			return "";
		}
		catch (err) {
			return String(err);
		}

	}

	public get clientId() {
		return this._clientId;
	}

	private validateRequest(ctx: Context): boolean {
		const clientId = ctx.query.client;
		// != didn't yield good results
		if ((clientId  || null) !== (this.clientId || null)) {
			ctx.status = 500;
			ctx.body = { error: `Wrong client id ${clientId}` };
			return false;
		}
		return true;
	}
}



const app = new MLDBApp();
const processArgv = argv(process.argv.slice(2)),
	options = processArgv({}) as IMLAppOptions;

app.run(options as IMLDBOptions)
	.then(async () => {
		console.log(`App listening on port ${app.port}`);
		if (options.test) {
			const errors = await testDB(app.port, app.clientId);
			if (errors.length) {
				console.warn("Test errors: ", errors.join('\n'));
			}
		}
	})
	.catch(err => { console.error(`ML DB App failed: ${err}`); process.exit(1); });