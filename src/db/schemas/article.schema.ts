export const ArticleSchema = {
	"articles": {
		schema: {
			version: 0,
			title: 'Schema for ML Articles',
			keyCompression: false,
			primaryKey: 'url',
			type: 'object',
			properties: {
				url: {
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
				},
				locales: {
					type: "array",
					items: {
						type: "string"
					}
				},


			},
			required: [
				'url',
				"labels",
				"locales",
				"startDate"
			]
		}
	}
}