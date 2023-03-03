"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUtils = exports.FileUtils = void 0;
const fs = __importStar(require("fs"));
const fsPath = __importStar(require("path"));
const rimraf_1 = __importDefault(require("rimraf"));
const createPatternArray = (arr) => {
    return arr.map(sr => {
        if (typeof sr === "string") {
            return new RegExp([
                '^',
                sr
                    .replace(/\./g, "\\.")
                    .replace(/\*/g, ".*"),
                '$'
            ].join(''), "i");
        }
        if (sr instanceof RegExp) {
            return sr;
        }
        throw new Error(`Illegal pattern type ${typeof sr}`);
    });
};
const matchesArray = (filePath, exprs) => {
    const ind = exprs.findIndex(re => re.test(filePath));
    return ind >= 0;
};
const directoryExists = async (filePath) => {
    try {
        const result = await fs.promises.lstat(filePath);
        return Boolean(result === null || result === void 0 ? void 0 : result.isDirectory());
    }
    catch (e) {
        return false;
    }
};
const fileExists = async (filePath) => {
    try {
        const result = await fs.promises.lstat(filePath);
        return Boolean(result === null || result === void 0 ? void 0 : result.isFile());
    }
    catch (e) {
        return false;
    }
};
const existsOnFs = async (filePath) => {
    try {
        const result = await fs.promises.lstat(filePath);
        return Boolean((result === null || result === void 0 ? void 0 : result.isFile()) || (result === null || result === void 0 ? void 0 : result.isDirectory()));
    }
    catch (e) {
        return false;
    }
};
const recurseFiles = async (options) => {
    const results = [];
    const list = await fs.promises.readdir(options.rootPath, { withFileTypes: true });
    const normalizeSlash = (s) => s.replace(/\\/g, '/');
    try {
        for (const file of list) {
            const relativePath = options.relativePath ?
                fsPath.join(options.relativePath, file.name) : file.name;
            const src = fsPath.join(options.rootPath, file.name);
            const filePath = {
                name: file.name,
                relative: normalizeSlash(relativePath),
                full: src
            };
            const stat = await fs.promises.lstat(src);
            if (!stat) {
                throw new Error(`Failed to access file ${src}`);
            }
            if (!options.filter(filePath)) {
                console.log(`copy: Filtering out file ${src}`);
                continue;
            }
            if (stat.isDirectory()) {
                const process = await options.callback(filePath, true);
                if (process !== false && options.recursive) {
                    const sub = await recurseFiles(Object.assign(Object.assign({}, options), { rootPath: src, relativePath }));
                    results.push(...sub);
                }
            }
            else if (stat.isFile()) {
                const process = await options.callback(filePath, false);
                if (process !== false) {
                    results.push(filePath);
                }
            }
        }
    }
    catch (e) {
        console.error(e);
    }
    return results;
};
const createFileFilter = (options) => {
    var _a, _b, _c;
    if ((_a = options.exclude) === null || _a === void 0 ? void 0 : _a.length) {
        if ((_b = options.include) === null || _b === void 0 ? void 0 : _b.length) {
            throw new Error("createFileFilter: can't specify both include and exclude");
        }
        const exclude = createPatternArray(options.exclude);
        return (filePath) => {
            return !matchesArray(filePath.name, exclude)
                && !matchesArray(filePath.relative, exclude);
        };
    }
    else if ((_c = options.include) === null || _c === void 0 ? void 0 : _c.length) {
        const include = createPatternArray(options.include);
        return (filePath) => {
            return matchesArray(filePath.name, include)
                || matchesArray(filePath.relative, include);
        };
    }
    else {
        return () => true;
    }
};
class FileUtils {
    async mkdir(path) {
        try {
            const result = await fs.promises.mkdir(path, { recursive: true });
            return result || "";
        }
        catch (e) {
            return "";
        }
    }
    async deleteAll(path) {
        if (!path || path.trim() === '/') {
            return "illegal path";
        }
        return new Promise((resolve) => {
            try {
                (0, rimraf_1.default)(path, {}, (err) => {
                    resolve((err === null || err === void 0 ? void 0 : err.toString()) || "");
                });
            }
            catch (err) {
                resolve(String(err));
            }
        });
    }
    exploreToFile(path) {
        let cmd = ``;
        switch (require(`os`).platform().toLowerCase().replace(/[0-9]/g, ``).replace(`darwin`, `macos`)) {
            case `win`:
                path = path || '=';
                cmd = `explorer`;
                break;
            case `linux`:
                path = path || '/';
                cmd = `xdg-open`;
                break;
            case `macos`:
                path = path || '/';
                cmd = `open`;
                break;
        }
        try {
            require(`child_process`).spawn(cmd, [path]);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async doForAllFiles(rootPath, options, callback) {
        if (!rootPath || !await directoryExists(rootPath)) {
            throw new Error(`doForAllFiles: source ${rootPath} not found`);
        }
        const filter = createFileFilter(options);
        return await recurseFiles({
            rootPath,
            recursive: options.recursive !== false,
            callback,
            filter,
            relativePath: ""
        });
    }
    async readFile(path) {
        if (!path) {
            return null;
        }
        try {
            const buffer = await fs.promises.readFile(path);
            return buffer && String(buffer) || null;
        }
        catch (e) {
            console.error(`While trying to read ${path}: ${String(e)}`);
            return null;
        }
    }
    async writeFile(path, content) {
        if (!path) {
            return false;
        }
        try {
            await fs.promises.writeFile(path, content);
            return true;
        }
        catch (e) {
            console.error(`While trying to write ${content === null || content === void 0 ? void 0 : content.length} characters to ${path}: ${String(e)}`);
            return false;
        }
    }
    async isFileOrFolder(path) {
        return Boolean(path) && await existsOnFs(path);
    }
    async isFile(path) {
        return Boolean(path) && await fileExists(path);
    }
    async isFolder(path) {
        return Boolean(path) && await directoryExists(path);
    }
    async copyFolder(srcPath, targetPath, options) {
        if (!srcPath || !await directoryExists(srcPath)) {
            throw new Error(`copyFolder: source ${srcPath} not found`);
        }
        if (!targetPath || !await directoryExists(targetPath)) {
            throw new Error(`copyFolder: target ${targetPath} not found`);
        }
        const filter = createFileFilter(options);
        const callback = async (filePath, isDirectory) => {
            const fullTarget = fsPath.join(targetPath, filePath.relative);
            if (isDirectory) {
                // console.log("Creating directory", fullTarget)
                await fs.promises.mkdir(fullTarget).catch(err => console.warn(String(err)));
            }
            else {
                // console.log(`Copying ${filePath.relative}`);
                await fs.promises.copyFile(filePath.full, fullTarget);
            }
            return true;
        };
        return await recurseFiles({
            recursive: options.recursive !== false,
            rootPath: srcPath,
            filter,
            callback,
            relativePath: ""
        });
    }
}
exports.FileUtils = FileUtils;
exports.fileUtils = new FileUtils();
//# sourceMappingURL=file-utils.js.map