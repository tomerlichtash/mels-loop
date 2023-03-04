export const ArticleSchema = {
	version: 0,
	title: 'Schema for ML Articles',
	keyCompression: false,
	primaryKey: 'path',
	type: 'object',
	properties: {
		path: {
			type: 'string',
			maxLength: 100 // <- string-fields that are used as an index, must have set maxLength.
		},
		labels: {
			type: "array",
			items: {
				type: "string"
			}
		},
		startDate: {
			type: "number"
		},
		endDate: {
			type: "number"
		}

	},
	required: [
		'path',
		"labels",
		"startDate"
	]
};