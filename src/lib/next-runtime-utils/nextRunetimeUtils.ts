import { IMLParsedNode, NodeAttributeMap } from 'types/models';
import { htmlValidator } from './htmlValidator';

/** CLIENT SIDE Streamlined access to the content generated by next.js in the ML component props */

/**
 * Return the page data, parsed from json if relevant
 * Guaranteed not null
 * @param pageData
 */
interface IMLNextBrowserUtils {
	getParsedPagedData<T>(pageData: string | object | null): T[];

	/**
	 * Returns an object with key-value entries for attributes that are valid for
	 * the provided node
	 * @param node
	 */
	extractNodeAttributes(node: IMLParsedNode): NodeAttributeMap;
}

class MLNextRuntimeUtils implements IMLNextBrowserUtils {
	public getParsedPagedData<T>(pageData: string | object | null): T[] {
		if (!pageData) {
			return [];
		}
		const parsedData =
			typeof pageData === 'string' ? JSON.parse(pageData) : pageData;

		return Array.isArray(parsedData) ? parsedData : [];
	}

	public extractNodeAttributes(node: IMLParsedNode): NodeAttributeMap {
		return htmlValidator.filterAttributesFor(node?.type, node?.attributes);
	}
}

export const mlNextBrowserUtils: IMLNextBrowserUtils = new MLNextRuntimeUtils();
