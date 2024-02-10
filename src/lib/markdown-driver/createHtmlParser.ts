import * as mdParser from 'simple-markdown';

// matches basic html strings <tag [attributes]>...</tag> including newlines
// not perfect, in case an attribute value contains /,
// but the performance would degrade significantly with the alternative

/**
 * Parses an HTML attribute string
 * Supports only double quotes for attribute value
 * @param attrStr
 * @returns
 */
const parseAttributes = (attrStr: string): Map<string, string> => {
	const attrMap = new Map<string, string>();
	if (!attrStr) {
		return attrMap;
	}
	const re = /\s*([a-z][a-z0-9\-_.]+)="([^"]*)"/gi;
	let match: RegExpExecArray;
	while ((match = re.exec(attrStr)) != null) {
		attrMap.set(match[1], match[2]);
	}
	return attrMap;
};

/**
 * Creates an simple-markdown parser that supports simple html and
 * HTML nodes include the type HTML and a tag field with the HTML tag
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createHtmlMDParser = () => {
	const HTML_RE = /^\s*<([a-z]+)([^>]+)*>([\s\S]*?)<\/\1>/i;
	const HTML_SELFCLOSE_RE = /^\s*<([a-z]+)([^/>]+)*\/>/i;
	const rules = {
		...mdParser.defaultRules,
		// Triple slash comments
		comment: {
			match: function (source: string) {
				return /^\s*\/\/\/([^\n\r]*)/.exec(source);
			},

			parse: function (capture: RegExpExecArray /*, recurseParse, state */) {
				return {
					content: capture[1],
				};
			},
			order: 0,
		},
		// html parser
		HTML: {
			match: function (source: string /*, state, lookbehind */) {
				const res = HTML_RE.exec(source) || HTML_SELFCLOSE_RE.exec(source);

				return res;
			},

			parse: function (
				capture: RegExpExecArray,
				recurseParse: (content: string, state: object) => Array<object>,
				state: object
			) {
				return {
					tag: capture[1],
					attributes: parseAttributes(capture[2]),
					content: (capture[3] && recurseParse(capture[3], state)) || undefined,
				};
			},
			order: 0,
		},
		// html parser
		//HTML_SELFCLOSE: {
		//	match: function (source: string /*, state, lookbehind */) {
		//		const res = HTML_SELFCLOSE_RE.exec(source)
		//		//|| HTML_SELFCLOSE_RE.exec(source);

		//		return res;
		//	},

		//	parse: function (capture: RegExpExecArray,
		//		recurseParse: (content: string, state: object) => Array<object>,
		//		state: object) {
		//		return {
		//			type: "HTML",
		//			tag: capture[1],
		//			attributes: parseAttributes(capture[2])
		//		};
		//	},
		//	order: 0
		//}
	};
	return mdParser.parserFor(rules);
};
