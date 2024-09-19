export enum ContentTypes {
	About = 'about',
	Contact = 'contact',
	Contrib = 'contribute',
	Codex = 'codex',
	Posts = 'posts',
	Docs = 'docs',
	Glossary = 'glossary',
	Annotation = 'annotations'
}

/** Site page navigation props */
export type IPageProps = {
	locale: string;
	documentPath: string;
	content: string;
	metaData?: string;
	className?: string;
	translate: (key: string) => string;
};
