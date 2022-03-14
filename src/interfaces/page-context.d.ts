import { IDynamicContentServer } from "./dynamic-content";
//import { PageContentAttributes } from "./models";

/**
 * Describes a content-related context, available to all rendered components under a ML page
 */
interface IPageContext {
	readonly dynamicContentServer: IDynamicContentServer;
}
