import "react";

declare module "*.st.css" {
	const stylesheet: import("@stylable/runtime").RuntimeStylesheet;
	export = stylesheet;
}

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

declare module "react" {
	interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
		jsx?: boolean;
		global?: boolean;
	}
}
