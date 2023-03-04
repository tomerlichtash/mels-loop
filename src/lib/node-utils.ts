import http from "http";

export interface IFetchOptions {
	method: string;
	data: object | null;
	url: string;
}

export interface IFetchResponse {
	data: object | null;
	error: string;
}


export interface IDataFetcher {
	fetchJSON(options: IFetchOptions): Promise<IFetchResponse>;
}

class DataFetcher implements IDataFetcher {

	public async fetchJSON({ data, url, method }: IFetchOptions): Promise<IFetchResponse> {
		const json = data ? JSON.stringify(data) : "";
		const options = {
			method,
			headers: method === "GET" ? undefined : {
				'Content-Type': 'application/json',
				'Content-Length': json.length,
			},
		};
	
		return new Promise((resolve: (response: IFetchResponse) => unknown) => {
			const data: string[] = [];
			const req = http.request(url, options, (res) => {
				res.setEncoding('utf8');
				res.on('data', (chunk) => {
					data.push(String(chunk));
				});
				res.on('end', () => {
					try {
						resolve({
							error: "",
							data: JSON.parse(data.join(''))
						})
					}
					catch (e) {
						resolve({
							data: null,
							error: String(e)
						});
					}
				});
			});
	
			req.on('error', (e) => {
				console.error(`problem with request: ${e.message}`);
				resolve({
					error: String(e),
					data: null
				});
			});
	
			// Write data to request body
			json && req.write(json);
			req.end();
		})
		.catch (e => {
			return {
				data: null,
				error: String(e)
			}
		});
	}
}

export const createDataFetcher: () => IDataFetcher = () => {
	return new DataFetcher();
}