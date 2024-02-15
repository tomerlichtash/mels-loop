import { stringArrayToMap } from '../utils';
import { DynamicContentTypes, type IDynamicContentRecord } from './types/types';
import { MLNODE_TYPES, type IMLParsedNode } from 'types/models';
import type {
	INodeProcessorContext,
	MLNodeProcessorFunction,
} from 'types/parser';

const ANNOTATION_RE = /annotations?\//i;
const GLOSSARY_RE = /glossary\//i;

class ContentUtils {
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

export const contentUtils = new ContentUtils();
