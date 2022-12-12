export interface ISendgridSubmitAPI {
	path: string;
	headers: Record<string, string>;
	method: "POST" | "GET" | "PUT" | "OPTIONS";
}

export const SUBMIT_API: Record<string, ISendgridSubmitAPI> = {
	SEND_GRID: {
		path: "/api/sendgrid",
		headers: { "Content-Type": "application/json" },
		method: "POST",
	},
};
