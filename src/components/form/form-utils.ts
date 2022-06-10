import { SUBMIT_API } from "../../config/public-api-params";
import { IFieldDef } from "./types";

export const trField = (field: IFieldDef, translate: (s: string) => string) => {
	return Object.assign({}, field, {
		locale: Object.fromEntries(
			Object.keys(field.locale).map((key) => [
				key,
				translate(field.locale[key] as string),
			])
		),
	});
};

export const onValuesSubmit = (values: JSX.Element[]) => {
	const { path, headers, method } = SUBMIT_API.SEND_GRID;
	return fetch(path, {
		body: JSON.stringify(
			Object.fromEntries(
				values.map((field) => {
					const { props } = field;
					const { id, value } = props;
					return [id, value];
				})
			)
		),
		headers,
		method,
	});
};
