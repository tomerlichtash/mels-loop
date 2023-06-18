

import {
    S3Client, ListObjectsV2Command
} from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";
import * as fsPath from "path";
import { createS3Proxy } from "./s3-client";

const bucket = "mels-loop-media";
const region = "eu-north-1"

const root = fsPath.resolve(__dirname, "..");
process.chdir(__dirname);
dotenv.config();

const s: S3Client = new (S3Client as any)({
    region
});

const newList = async () => {
    const proxy = createS3Proxy();
    const cmd = new ListObjectsV2Command({
        Bucket: proxy.bucket,

    });
    const response = await proxy.client.send(cmd);
    return response;
}



newList().then((response: any) => {
    console.log("List response", response);
})
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        console.log(`Done listing`);
        process.exit();
    });

