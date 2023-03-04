export namespace DB_MODELS {
    interface IArticleData {
        readonly path: string;
        readonly labels: string[];
        readonly startDate: number;
        readonly endDate: number;
    }

    interface IArticle extends IArticleData {
        readonly _meta: object;
    }

    interface ILabelData {
        readonly labels: string[];
        readonly articles: string[];
    }

    interface ILabel extends ILabelData {
        readonly id: string;
    }
}

