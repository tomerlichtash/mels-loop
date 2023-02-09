"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleSchema = void 0;
exports.ArticleSchema = {
    version: 0,
    title: 'Schema for ML Articles',
    keyCompression: false,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100 // <- the primary key must have set maxLength
        },
        relativePath: {
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
        'id',
        'relativePath',
        "labels",
        "startDate"
    ],
    indexes: [
        "relativePath"
    ]
};
//# sourceMappingURL=article.schema.js.map