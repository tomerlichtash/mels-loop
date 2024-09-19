import { DynamicContentTypes } from '../context/types';

/** describes a dynamic content item: its type and id */
interface IDynamicContentRecord {
	/** Annotation, gloassary etc */
	readonly type: DynamicContentTypes;
	/** The ID of the item to fetch */
	readonly id: string;
	/** Is the url relative, or does it start with `/` */
	readonly isRelative: boolean;
}

const ANNOTATION_RE = /annotations?\//i;
const GLOSSARY_RE = /glossary\//i;

const getId = (url: string) => {
	if (!url) return '';
	const parts = url.split('/');
	const id = parts[parts.length - 1];
	return (id && id.replace('#', '')) || '';
};

const getType = (url: string, defaultType: DynamicContentTypes): DynamicContentTypes => {
	if (!url) return defaultType || DynamicContentTypes.None;
	if (ANNOTATION_RE.test(url)) return DynamicContentTypes.Annotation;
	if (GLOSSARY_RE.test(url)) return DynamicContentTypes.Glossary;
	return defaultType || DynamicContentTypes.None;
};

export const urlToContentData = (
	url: string,
	defaultType?: DynamicContentTypes
): IDynamicContentRecord => {
	const type = getType(url, defaultType);
	const isTypeNone = type !== DynamicContentTypes.None;
	const hasRelativePath = url[0] !== '/';
	return {
		type,
		id: getId(url),
		isRelative: isTypeNone ? hasRelativePath : false
	};
};
