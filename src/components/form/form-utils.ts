import { SUBMIT_API } from "../../config/public-api-params";
import { FormValues, IFormResponse } from "./types";

export const onValuesSubmit = async (values: FormValues): Promise<IFormResponse> => {
	const { path, headers, method } = SUBMIT_API.SEND_GRID;
	const body = JSON.stringify(values);
	try {
		const response = await fetch(path, {
			body,
			headers,
			method,
		});
		return await response.json() as IFormResponse;
	}
	catch (e) {
		return {
			error: String(e)
		}
	}
};
