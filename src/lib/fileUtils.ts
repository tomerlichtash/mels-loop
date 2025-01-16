import { promises as fs} from 'fs';

/**
 * Helpers for ML API implementation
 */
export interface IFileUtils {
	/**
	 * resolves to true if the provided path points to an existing folder
	 * @param fspath: file system path
	 */
	isFolder(fspath: string): Promise<boolean>;
	/**
	 * resolves to true if the provided path points to an existing file (not folder)
	 * @param fspath: file system path
	 */
	isFile(fspath: string): Promise<boolean>;

}

class FileUtils implements IFileUtils {
	public async isFolder(fspath: string): Promise<boolean> {
        try {
            const info = await fs.lstat(fspath);
            return Boolean(info?.isDirectory());
        }
        catch (e) {
            return false;
        }
	}
	public async isFile(fspath: string): Promise<boolean> {
        try {
            const info = await fs.lstat(fspath);
            return Boolean(info?.isFile());
        }
        catch (e) {
            return false;
        }
	}
}

export const fileUtils: IFileUtils = new FileUtils();
