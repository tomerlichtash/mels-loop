import { SUBMIT_API } from "../../config/public-api-params";
import { FormValues } from "./types";

export const onValuesSubmit = (values: FormValues) => {
	const { path, headers, method } = SUBMIT_API.SEND_GRID;
	const body = JSON.stringify(values);
	return fetch(path, {
		body,
		headers,
		method,
	});
};
