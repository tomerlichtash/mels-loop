import * as fs from 'fs';
import * as nodeUtils from 'util';
import * as tempFiles from 'tmp';
import type { IParsedPage } from '../lib/types/models';
import type { DynamicContentTypes } from 'context/types';

export interface IMLApiResponse<T> {
	error?: string;
	data: T;
}

export interface IMLDynamicContentParams {
	readonly locale: string;
	readonly type: DynamicContentTypes;
	readonly document?: string;
}

export interface IMLDynamicContentResponse {
	/**  The locale of this response */
	locale: string;
	/** Map of pageId => page data */
	items: { [pageId: string]: IParsedPage };
}

export interface IMLApiUtils {
	/**
	 * Load a string from a cache, by key
	 * @param key
	 */
	getFromCache(key: string): Promise<string>;

	/**
	 * Save a string to cache, using `key` for later retrieval
	 * @param key
	 * @param data
	 */
	saveToCache(key: string, data: string): Promise<boolean>;
}

class MLApiUtils implements IMLApiUtils {
	private readonly fileMap: Map<string, string> = new Map<string, string>();

	async getFromCache(key: string): Promise<string> {
		if (!key) {
			return null;
		}

		const path = this.fileMap.get(key);

		if (!path) {
			return null;
		}

		try {
			const read = nodeUtils.promisify(fs.readFile);
			const buffer = await read(path);
			if (!buffer || buffer.length < 1) {
				this.fileMap.delete(key);
				return null;
			}
			return JSON.parse(buffer.toString());
		} catch (e) {
			return null;
		}
	}

	public async saveToCache(key: string, data: string): Promise<boolean> {
		if (!key || !data) {
			return false;
		}

		const mktemp = nodeUtils.promisify(tempFiles.file);

		try {
			const filePath = await mktemp();
			if (filePath) {
				const write = nodeUtils.promisify(fs.writeFile);
				await write(filePath, JSON.stringify(data));
				this.fileMap.set(key, filePath);
				return true;
			}
		} catch (e) {
			return false;
		}
	}
}

export const mlApiUtils: IMLApiUtils = new MLApiUtils();
