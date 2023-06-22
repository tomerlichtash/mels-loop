import { GetObjectCommandOutput, S3Client } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";

const root = process.cwd();
process.chdir(__dirname);
dotenv.config();
process.chdir(root);

export interface IS3Proxy {
	/**
	 * caller's responsibility to urlencode
	 * @param name 
	 */
	getObjectUrl(name: string): string;
	readonly client: S3Client;
	readonly bucket: string;
	readonly region: string;
}

class S3Proxy implements IS3Proxy {
	private _client: S3Client | null = null;

	constructor() {
		const envKeys = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_BUCKET", "AWS_REGION"];
		envKeys.forEach(key => {
			if (!process.env[key]) {
				throw new Error(`Environment variables ${envKeys.join(',')} must be defined`);
			}
		})
	}

	public getObjectUrl(name: string): string {
		return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${name}`
	}

	public get bucket() {
		return process.env.AWS_BUCKET || "";
	}

	public get region() {
		return process.env.AWS_REGION || "";
	}

	public get client(): S3Client {
		if (!this._client) {
			this._client = new S3Client({
				region: this.region
			});
		}
		return this._client!;
	}
}

export const createS3Proxy = (): IS3Proxy => {
	return new S3Proxy();
}

