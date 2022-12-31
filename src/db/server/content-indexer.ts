import { fileUtils, IFilePath } from "../../lib/file-utils";

export interface IContentIndexr {
	run(): Promise<IContentIndexResult>;
}

export interface IContentIndexResult {
	success: ReadonlyArray<string>;
	failed: ReadonlyArray<string>;
	errors: ReadonlyArray<string>;
}

class ContentIndexer {
	private readonly paths: ReadonlyArray<string>;
	constructor(...paths: string[]) {
		this.paths = Array.from(paths);

	}

	public async run(): Promise<IContentIndexResult> {
		const ret = {
			success: <string[]>[],
			failed: <string[]>[],
			errors: <string[]>[]
		}
		for (let path of this.paths) {
			const result = await this.indexPath(path);
			ret.success.push(...result.success);
			ret.failed.push(...result.failed);
			ret.errors.push(...result.errors);
		}
		return ret;
	}

	////////////////// Immplementation ///////////////////////////

	private async indexPath(path: string): Promise<IContentIndexResult> {
		const allFiles: string[] = await this.listFiles(path);
		const ret = {
			success: <string[]>[],
			failed: <string[]>[],
			errors: <string[]>[]
		}
		try {
			for (let file of allFiles) {
				const error = await this.indexOneFile(file);
				if (error) {
					ret.errors.push(error);
					ret.failed.push(file);
				}
				else {
					ret.success.push(file);
				}
			}
		}
		catch(e) {
			ret.errors.push(`Error processing ${path}: ${String(e)}`);
		}
		return ret;
	}

	private async listFiles(folderPath: string): Promise<string[]> {
		const result: string[] = [];
		const processFile = async (fileInfo: IFilePath, isDirectory: boolean) => {
			if (!isDirectory) {
				result.push(fileInfo.full);
			}
			return true;
		}
		await fileUtils.doForAllFiles(folderPath, {}, processFile);
		return result;
	}

	private async indexOneFile(path: string): Promise<string> {

		try {
			return "";
		}
		catch(e) {
			return `Error processing ${path}: ${String(e)}`;
		}
	}
}


export const createContentIndexer = (...paths: string[]): IContentIndexr => new ContentIndexer(...paths);