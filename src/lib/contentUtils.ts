import { stringArrayToMap } from '../utils';
import { MLNODE_TYPES } from 'types/nodes';
import { DynamicContentTypes } from 'types/content';
import type { IMLParsedNode } from 'types/models';
import type {
	INodeProcessorContext,
	MLNodeProcessorFunction,
} from 'types/parser/parser';

/** describes a dynamic content item: its type and id */
interface IDynamicContentRecord {
	/** Annotation, gloassary etc */
	readonly type: DynamicContentTypes;

	/** The id of the item to fetch */
	readonly id: string;

	/** Is the url relative, or does it start with `/` */
	readonly isRelative: boolean;
}

const ANNOTATION_RE = /annotations?\//i;
const GLOSSARY_RE = /glossary\//i;

export interface IContentUtils {
	/**
	 * Creates a content mapping function (maps node => node) only for the provided types
	 * @param filter
	 * @param types
	 */
	createNodeMappingFilter(
		filter: MLNodeProcessorFunction,
		...types: Array<MLNODE_TYPES>
	): MLNodeProcessorFunction;

	/**
	 * Extract content type and id from a url, with a default content type
	 * @param url
	 * @param defaultType
	 */
	urlToContentData(
		url: string,
		defaultType?: DynamicContentTypes
	): IDynamicContentRecord;
}

class ContentUtils implements IContentUtils {
	public createNodeMappingFilter(
		filter: MLNodeProcessorFunction,
		...types: Array<MLNODE_TYPES>
	): MLNodeProcessorFunction {
		if (!types?.length) {
			return (n) => n;
		}

		const typeMap = stringArrayToMap(types);

		return (node: IMLParsedNode, context: INodeProcessorContext) => {
			if (!node || !(node.type in typeMap)) {
				return null;
			}

			return filter(node, context);
		};
	}

	public urlToContentData(
		url: string,
		defaultType?: DynamicContentTypes
	): IDynamicContentRecord {
		const contentData = {
			type: this.urlToContentType(url, defaultType),
			id: this.urlToContentId(url),
			isRelative: false,
		};

		if (contentData.type !== DynamicContentTypes.None) {
			contentData.isRelative = url[0] !== '/';
		}

		return contentData;
	}

	public urlToContentId(url: string) {
		if (!url) {
			return '';
		}
		const parts = url.split('/');
		const id = parts[parts.length - 1];
		return (id && id.replace('#', '')) || '';
	}

	private urlToContentType(
		url: string,
		defaultType: DynamicContentTypes
	): DynamicContentTypes {
		if (!url) {
			return defaultType || DynamicContentTypes.None;
		}

		if (ANNOTATION_RE.test(url)) {
			return DynamicContentTypes.Annotation;
		}

		if (GLOSSARY_RE.test(url)) {
			return DynamicContentTypes.Glossary;
		}

		return defaultType || DynamicContentTypes.None;
	}
}

export const contentUtils: IContentUtils = new ContentUtils();
