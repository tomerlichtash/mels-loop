import { IDynamicContentServer } from "./dynamic-content";

/**
 * Describes a content-related context, available to all rendered components under a ML page
 */
export interface IPageContext {
	readonly dynamicContentServer: IDynamicContentServer;
}
