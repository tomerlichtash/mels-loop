import { LocaleId } from "../../types";

export const TRANS_DELIM = "%";
export const wrapStr = (str: string) => `${TRANS_DELIM}${str}${TRANS_DELIM}`;

export const _translate =
	(langRef: string, langs: Record<LocaleId, Record<string, string>>) =>
	(key: string, lang?: string): string => {
		if (!key) {
			return;
		}
		const ref = lang || langRef;
		if (!langs[ref]) {
			return wrapStr(`${ref}_${key}`);
		} else if (!langs[ref][key] || !langs[ref][key].length) {
			return wrapStr(key);
		}
		return langs[ref][key] || wrapStr(key);
	};
