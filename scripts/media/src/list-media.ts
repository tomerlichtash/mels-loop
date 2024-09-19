import {
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
} from '@aws-sdk/client-s3';
import { createS3Proxy } from './lib/s3-client';

// runs without params to list the content of the bucket configured in .env

const proxy = createS3Proxy();

const listObjects = async () => {
  const cmd = new ListObjectsV2Command({
    Bucket: proxy.bucket,
  });
  const response = await proxy.client.send(cmd);
  return response;
};

listObjects()
  .then((response: ListObjectsV2CommandOutput) => {
    console.log(
      'List response',
      response.Contents?.map((o) => ({
        name: o.Key,
        size: ((o.Size || 0) / 1000).toFixed(2) + 'KB',
        url: proxy.getObjectUrl(o.Key || ''),
      }))
    );
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    process.exit();
  });
