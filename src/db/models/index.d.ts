export namespace DB_MODELS {
    interface IArticleData {
        readonly relativePath: string;
        readonly labels: string[];
        readonly startDate: number;
        readonly endDate: number;
    }

    interface IArticle extends IArticleData {
        readonly id: string;
    }

    interface ILabelData {
        readonly labels: string[];
        readonly articles: string[];
    }

    interface ILabel extends ILabelData {
        readonly id: string;
    }
}

