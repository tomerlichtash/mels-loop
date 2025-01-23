import getConfig from 'next/config';
import * as fsPath from 'path';
import { promises as fs} from 'fs';
import { fileUtils } from '../fileUtils';
import { parse as parseJSON } from 'json5';

/**
 * App object that contains data about the current build
 */
export interface IYasppApp {
	readonly rootPath: string;
	readonly contentPath: string;
}

interface IYasppConfig {
	readonly content: {
		readonly root: string;
	}
}

const CONFIG_FILE = "yaspp.json";

class YasppApp implements IYasppApp {
	private _root = "";
	private _content = "";
	private _isLoading = false;

	public get isLoading() {
		return this._isLoading;
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
		} 
		catch (err) {
			return `Error loading configuration from ${configPath}: ${err}`;
		}
	}

	public get contentPath() {
		return this._content;
	}

	public get rootPath() {
		return this._root;
	}

	private _validateConfig(config: Partial<IYasppConfig>): IYasppConfig {
		if (!config?.content?.root) {
			return {
				content: {
					root: ""
				}
			};
		}
		return config as IYasppConfig
	}
}

let _instance: YasppApp | null = null;
type InitCallback = (app: IYasppApp) => unknown;
const resolvers: InitCallback[] = [];

export const initYaspp = async function (root?: string): Promise<IYasppApp> {

	if (_instance) {
		if (!_instance.isLoading) {
			return _instance;
		}
		const p = new Promise<IYasppApp>(resolve => {
			resolvers.push(resolve);
		});
		return p;
	}
	const app = _instance = new YasppApp();
	if (!root) {
		const { serverRuntimeConfig } = getConfig();
		root = String(serverRuntimeConfig.PROJECT_ROOT);
	}
	const error = await app.init(root);
	if (error) {
		const err = `Error loading yaspp: ${error}`;
		console.log(err);
		// throw new Error(`Error loading yaspp: ${error}`);
	}
	resolvers.forEach(resolve => resolve(app));
	resolvers.length = 0;
	return app;

}
