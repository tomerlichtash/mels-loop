import { IDynamicContentServer } from '../../lib/types/dynamic-content';

/**
 * Describes a content-related context, available to all rendered components under a ML page
 */
export interface IPageContext {
	readonly dynamicContentServer: IDynamicContentServer;
	/**
	 * The path of the document displayed in the current component
	 */
	readonly documentPath: string;
}
