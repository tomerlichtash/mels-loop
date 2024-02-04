export interface IFetchParams {
	path: string;
	headers: Record<string, string>;
	method: 'POST' | 'GET' | 'PUT' | 'OPTIONS';
}

const SENDGRID_API: IFetchParams = {
	path: '/api/sendgrid',
	headers: { 'Content-Type': 'application/json' },
	method: 'POST',
};

export default SENDGRID_API;

// export const SUBMIT_API: Record<string, IFetchParams> = {
// 	SEND_GRID: {
// 		path: "/api/sendgrid",
// 		headers: { "Content-Type": "application/json" },
// 		method: "POST",
// 	},
// };
