import { ParsedUrlQuery } from "querystring";

export interface IQueryDriver {
	query: ParsedUrlQuery;
}

export class QueryDriver implements IQueryDriver {
	public query: ParsedUrlQuery;

	constructor(props: IQueryDriver) {
		this.query = props.query;
	}

	public getPopoverForceId(): string {
		return JSON.stringify(this.query);
	}
}
