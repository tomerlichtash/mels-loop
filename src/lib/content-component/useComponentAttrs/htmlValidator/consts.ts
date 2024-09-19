export const ALLOWED_HTML_ATTRIBUTES = {
	'*': {
		valid: ['data-type', 'align', 'dir']
	},
	TD: {
		valid: ['rowspan', 'colspan']
	},
	TH: {
		valid: ['rowspan', 'colspan']
	},
	TABLE: {
		valid: ['border', 'cellpadding', 'cellspacing']
	}
};
