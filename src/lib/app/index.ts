import getConfig from 'next/config';
import * as fsPath from 'path';
import { promises as fs } from 'fs';
import { fileUtils } from '../fileUtils';
import { parse as parseJSON } from 'json5';

/**
 * App object that contains data about the current build
 */
export interface IYasppApp {
	/**
	 * The full root path of this app
	 */
	readonly rootPath: string;
	/**
	 * The full path of the content folder
	 */
	readonly contentPath: string;
	/**
	 * The relative (to the content path) path of the index page
	 */
	readonly indexPath: string;
	/**
	 * True if this app was initialized successfully and found all its paths
	 */
	readonly isValid: boolean;
}

interface IYasppConfig {
	readonly content: {
		readonly root: string;
		readonly index: string;
	}
}

const CONFIG_FILE = "yaspp.json";

class YasppApp implements IYasppApp {
	private _root = "";
	private _content = "";
	private _indexPage = "";
	private _isLoading = false;

	public get isLoading() {
		return this._isLoading;
	}

	public get isValid(): boolean {
		return Boolean(this._indexPage)
	}
	public async init(cwd: string): Promise<string> {
		if (this._isLoading) {
			throw new Error("Can't call yaspp app init when it's loading");
		}
		this._isLoading = true;
		if (!await fileUtils.isFolder(cwd)) {
			return `path ${cwd} is not a folder, can't find ${CONFIG_FILE}`;
		}
		this._root = cwd;
		const configPath = fsPath.resolve(cwd, CONFIG_FILE);
		if (!await fileUtils.isFile(configPath)) {
			return `Can't find file ${configPath}`;
		}
		try {
			const data = await fs.readFile(configPath, "utf-8");
			const config = this._validateConfig(parseJSON(data));
			if (!config.content.root) {
				return `Invalid content root in yaspp.json`;
			}
			const contentPath = fsPath.resolve(cwd, config.content.root)
			if (!await fileUtils.isFolder(contentPath)) {
				return `Content path indicated by config not found: ${contentPath}`;
			}
			this._content = contentPath;
			const indexPath = fsPath.resolve(contentPath, config.content.index);
			if (!await fileUtils.isFileOrFolder(indexPath)) {
				return `Failed to find index pag/folder at ${indexPath}`;
			}
			this._indexPage = config.content.index;
			return "";
		}
		catch (err) {
			return `Error loading configuration from ${configPath}: ${err}`;
		}
	}

	public get indexPath() {
		return this._indexPage;
	}

	public get contentPath() {
		return this._content;
	}

	public get rootPath() {
		return this._root;
	}

	private _validateConfig(config: Partial<IYasppConfig>): IYasppConfig {
		return {
			content: {
				root: config?.content?.root || "",
				index: config?.content?.index || ""
			}
		};
	}
}

const _instances: Map<string, {
	app: YasppApp;
	resolvers: InitCallback[];
}> = new Map();
type InitCallback = (app: IYasppApp) => unknown;

export const initYaspp = async function (root?: string): Promise<IYasppApp> {
	if (!root) {
		const { serverRuntimeConfig } = getConfig();
		root = String(serverRuntimeConfig.PROJECT_ROOT);
	}
	const { app, resolvers } = _instances.get(root) ?? {
		app: new YasppApp(),
		resolvers: []
	}
	if (app.isValid) {
		return app;
	}
	if (app.isLoading) {
		const p = new Promise<IYasppApp>(resolve => {
			resolvers.push(resolve);
		});
		return p;
	}
	_instances.set(root, { app, resolvers });
	const error = await app.init(root);
	if (error) {
		const err = `Error loading yaspp: ${error}`;
		console.log(err);
		// throw new Error(`Error loading yaspp: ${error}`);
	}
	_instances.set(root, { app, resolvers: []});
	resolvers.forEach(resolve => resolve(app));
	return app;

}
