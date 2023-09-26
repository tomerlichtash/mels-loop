declare module "*.svg" {
	const urlToFile: string;
	export default urlToFile;
}

declare module "*.css" {
	const stylesheet: void;
	export default stylesheet;
}

declare module "*.json" {
	const json: string;
	export default json;
}

declare module "@mui/material/styles" {
	interface Theme {
		status: {
			danger: string;
		};
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		status?: {
			danger?: string;
		};
	}
}
