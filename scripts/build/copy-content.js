"use strict";
const fs = require("fs").promises;
const fsPath = require("path");
const spawn = require("child_process").spawn;
const parseJSON = require("json5").parse;
async function isFolder(fspath) {
    try {
        const info = await fs.lstat(fspath);
        return Boolean(info?.isDirectory());
    }
    catch (e) {
        return false;
    }
}
function runProcess(exe, argv, cwd) {
    return new Promise(resolve => {
        const proc = spawn(exe, argv, {
            cwd
        });
        proc.on('close', function () {
            const code = Number(proc.exitCode);
            resolve(isNaN(code) ? 1 : code);
        });
    });
}
function copyContent(srcPath, targetPath) {
    return new Promise(async (resolve) => {
        if (!await isFolder(srcPath)) {
            return resolve(`Content Folder ${srcPath} not found`);
        }
        await fs.mkdir(targetPath, { recursive: true });
        if (!await isFolder(targetPath)) {
            return resolve(`Target Folder ${targetPath} not found`);
        }
        const rmargs = ["-rf", '*'];
        const rmCode = await runProcess("rm", rmargs, targetPath);
        const cpargs = ["-r", '*', targetPath];
        const code = await runProcess("cp", cpargs, srcPath);
        resolve(code === 0 ? "" : `Error copying content, exit code ${code}`);
    });
}
/**
 * Returns an error message, empty if no error
 */
async function run() {
    try {
        const rootPath = fsPath.resolve(__dirname, "../.."), configPath = fsPath.resolve(rootPath, "yaspp.json");
        const data = await fs.readFile(configPath, "utf-8");
        const config = parseJSON(data), content = config.content?.root;
        if (!content) {
            return "Can't find content folder in yaspp.json";
        }
        const contentPath = fsPath.resolve(rootPath, content), targetPath = fsPath.resolve(rootPath, "public/content");
        return await copyContent(contentPath, targetPath);
    }
    catch (e) {
        return `Error loading yaspp.json: ${e}`;
    }
}
run()
    .then(err => {
    if (err) {
        console.error(err);
    }
    process.exit(err ? 1 : 0);
})
    .catch(err => {
    console.error(err);
    process.exit(2);
});
//# sourceMappingURL=copy-content.js.map