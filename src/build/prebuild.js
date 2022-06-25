var _a = require('fs'), writeFile = _a.writeFile, existsSync = _a.existsSync, mkdirSync = _a.mkdirSync;
var joinPath = require("path").join;
var https = require('https');
var allUrls = [
    {
        host: "mels-loop-c57f5duv5-konzepz.vercel.app",
        path: "/api/ping"
    },
    {
        host: "catfact.ninja",
        path: "/fact"
    }
];
function makeHeader(url) {
    return "---\ntitle: \"Downloaded from " + url + "\"\nauthor: \"Bot\"\ndate: " + (new Date()).toString() + "\n---\n";
}
function makePath(url) {
    return url.replace(/[\/\\]+/g, "_").replace(/^[_]+/, "").replace(/[_]+$/, "");
}
function ensureDir(dir) {
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
}
function writeIt(data, url, callback) {
    var fpath = makePath(url);
    var path = joinPath(__dirname, "../../public/content/tests/" + fpath);
    var fullPath = joinPath(path, "index.en.md");
    ensureDir(path);
    console.log("Writing " + data + " to " + fullPath);
    writeFile(fullPath, makeHeader(fpath) + data, function (err) {
        err && console.error(err);
        callback && callback();
    });
}
function fetchIt(urls) {
    var rec = urls[0], rest = urls.slice(1);
    var options = {
        hostname: rec.host,
        port: 443,
        path: rec.path,
        method: 'GET',
    };
    var next = function () {
        if (rest.length) {
            fetchIt(rest);
        }
        else {
            console.log("fetched last url");
            process.exit(0);
        }
    };
    console.log("Fetching " + rec.host + "/" + rec.path);
    var req = https.request(options, function (res) {
        console.log("status: " + res.statusCode);
        res.on('data', function (d) {
            writeIt(String(d), rec.path, next);
            //next();
            //process.stdout.write(d);
        });
    });
    req.on('error', function (error) {
        console.error(error);
        next();
    });
    req.end();
}
fetchIt(allUrls);
//fetch("https://mels-loop-c57f5duv5-konzepz.vercel.app/api/ping").
//	then(response => {
//		console.log("runner");
//		process.exit(0);
//	})
//# sourceMappingURL=prebuild.js.map