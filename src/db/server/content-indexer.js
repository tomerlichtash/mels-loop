"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContentIndexer = void 0;
const file_utils_1 = require("../../lib/file-utils");
class ContentIndexer {
    constructor(...paths) {
        this.paths = Array.from(paths);
    }
    async run() {
        const ret = {
            success: [],
            failed: [],
            errors: []
        };
        for (let path of this.paths) {
            const result = await this.indexPath(path);
            ret.success.push(...result.success);
            ret.failed.push(...result.failed);
            ret.errors.push(...result.errors);
        }
        return ret;
    }
    ////////////////// Immplementation ///////////////////////////
    async indexPath(path) {
        const allFiles = await this.listFiles(path);
        const ret = {
            success: [],
            failed: [],
            errors: []
        };
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
        catch (e) {
            ret.errors.push(`Error processing ${path}: ${String(e)}`);
        }
        return ret;
    }
    async listFiles(folderPath) {
        const result = [];
        const processFile = async (fileInfo, isDirectory) => {
            if (!isDirectory) {
                result.push(fileInfo.full);
            }
            return true;
        };
        await file_utils_1.fileUtils.doForAllFiles(folderPath, {}, processFile);
        return result;
    }
    async indexOneFile(path) {
        try {
            return "";
        }
        catch (e) {
            return `Error processing ${path}: ${String(e)}`;
        }
    }
}
function createContentIndexer(...paths) {
    return new ContentIndexer(...paths);
}
exports.createContentIndexer = createContentIndexer;
//# sourceMappingURL=content-indexer.js.map