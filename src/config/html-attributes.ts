
export const ALLOWED_HTML_ATTRIBUTES = {
	TD: {
		valid: [ "rowspan", "colspan" ]
	},
	TH: {
		valid: [ "rowspan", "colspan" ]
	},
	TABLE: {
		valid: [ "data-type", "border", "cellpadding", "cellspacing"]
	}
};
