import { IFetchParams } from "../../config/public-api-params";
import { FormValues, IFormResponse } from "./types";

export const onValuesSubmit =
	(submitApi: IFetchParams) =>
	async (values: FormValues): Promise<IFormResponse> => {
		const { path, headers, method } = submitApi;
		const body = JSON.stringify(values);
		try {
			const response = await fetch(path, {
				body,
				headers,
				method,
			});
			return (await response.json()) as IFormResponse;
		} catch (e) {
			return {
				error: String(e),
			};
		}
	};
