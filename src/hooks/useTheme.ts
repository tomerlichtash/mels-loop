import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function useTheme<
	T extends Record<string, string[] | { classes: string[]; css: string }>
>(
	themes: T,
	ref: React.MutableRefObject<any>,
	styleRef: React.MutableRefObject<any>
): (theme: keyof T) => void {
	const [theme, setTheme] = useState<keyof T>(
		Cookies.get("theme") || Object.keys(themes)[0]
	);

	useEffect(() => {
		const sref = styleRef;
		const el = ref.current;

		if (!el) throw new Error("missing ref element");

		let classes = themes[theme] as
			| string[]
			| { classes: string[]; css: string };

		if (!Array.isArray(classes)) {
			if (!sref) {
				throw new Error("when using inline theme styleRef must be provided");
			}
			sref.current.textContent = classes.css;
			classes = classes.classes;
		}

		classes.forEach((className) => el.classList.add(className));

		return () => {
			if (sref) {
				sref.current.textContent = "";
			}
			if (Array.isArray(classes)) {
				classes.forEach((className) => el.classList.remove(className));
			}
		};
	}, [themes, theme, ref, styleRef]);

	return setTheme;
}
