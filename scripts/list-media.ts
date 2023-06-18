

import {
    ListObjectsV2Command
} from "@aws-sdk/client-s3";
import { createS3Proxy } from "./s3-client";


const listObjects = async () => {
    const proxy = createS3Proxy();
    const cmd = new ListObjectsV2Command({
        Bucket: proxy.bucket,

    });
    const response = await proxy.client.send(cmd);
    return response;
}



listObjects().then((response: any) => {
    console.log("List response", response);
})
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        console.log(`Done listing`);
        process.exit();
    });

