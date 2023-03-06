import http from "http";

export interface IFetchQuery {
	[key: string] : unknown;
}

export interface IFetchOptions {
	method: string;
	data: object | null;
	url: string,
	query?: IFetchQuery
}

export interface IFetchResponse<T = unknown> {
	error: string;
	data: T;
}


export interface IDataFetcher {
	fetchJSON(options: IFetchOptions): Promise<IFetchResponse>;
}

class DataFetcher implements IDataFetcher {

	public async fetchJSON<T>({ data, url, method, query }: IFetchOptions): Promise<IFetchResponse<T>> {
		const json = data ? JSON.stringify(data) : "";
		const options = {
			method,
			headers: method === "GET" ? undefined : {
				'Content-Type': 'application/json',
				'Content-Length': json.length,
			},
		};
		const queryKeys = Object.keys(query || {});
		if (queryKeys.length) {
			url += '?' +
				queryKeys.map((key => `${key}=${encodeURIComponent(String(query[key]))}`))
				.join('&')
		}
	
		return new Promise((resolve: (response: IFetchResponse<T>) => void) => {
			const data: string[] = [];
			const req = http.request(url, options, (res) => {
				res.setEncoding('utf8');
				res.on('data', (chunk) => {
					data.push(String(chunk));
				});
				res.on('end', () => {
					try {
						const response = JSON.parse(data.join(''));
						if (typeof response?.error === "string") {
						return resolve({
								...response
							} as IFetchResponse<T>);
						}
						resolve({
							error: "",
							data: response
						})
					}
					catch (e) {
						console.error(`Error parsing ${data.join('')}`);
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