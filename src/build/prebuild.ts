const { writeFile, existsSync, mkdirSync } = require('fs');
const { join: joinPath } = require("path");
const https = require('https');

const allUrls = [
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
	return `---
title: "Downloaded from ${url}"
author: "Bot"
date: ${(new Date()).toString()}
---
`
}

function makePath(url) {
	return url.replace(/[\/\\]+/g, "_").replace(/^[_]+/, "").replace(/[_]+$/, "");
}

function ensureDir(dir) {

	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}
}

function writeIt(data: string, url: string, callback: Function): void {
	const fpath = makePath(url);
	const path = joinPath(__dirname, `../../public/content/tests/${fpath}`);
	const fullPath = joinPath(path, "index.en.md");
	ensureDir(path);
	console.log(`Writing ${data} to ${fullPath}`);
	writeFile(fullPath, makeHeader(fpath) + data, (err) => {
		err && console.error(err);
		callback && callback();
	});
}


function fetchIt(urls) {
	const rec = urls[0],
		rest = urls.slice(1);
	const options = {
		hostname: rec.host,
		port: 443,
		path: rec.path,
		method: 'GET',
	};
	const next = () => {
		if (rest.length) {
			fetchIt(rest);
		}
		else {
			console.log("fetched last url");
			process.exit(0);
		}

	}

	console.log(`Fetching ${rec.host}/${rec.path}`);
	const req = https.request(options, res => {
		console.log(`status: ${res.statusCode}`);
		res.on('data', d => {
			writeIt(String(d), rec.path, next);
			//next();
			//process.stdout.write(d);
		});
	});

	req.on('error', error => {
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
