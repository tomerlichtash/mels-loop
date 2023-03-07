"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelSchema = void 0;
exports.LabelSchema = {
    "labels": {
        schema: {
            version: 0,
            title: 'Schema for ML Labels',
            keyCompression: false,
            primaryKey: 'id',
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 100 // <- string-fields that are used as an index, must have set maxLength.
                },
                articles: {
                    type: "array",
                    items: {
                        ref: "articles",
                        type: "string"
                    }
                }
            },
            required: [
                'url',
                "labels",
                "locales",
                "startDate"
            ]
        }
    }
};
//# sourceMappingURL=label.schema.js.map