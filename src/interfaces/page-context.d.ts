import { IDynamicContentServer } from "./dynamic-content";
import { PageContentAttributes } from "./models";

interface IPageContext {
	//readonly pageAttributes: Array<PageContentAttributes>;
	hasAttribute(attr: PageContentAttributes): boolean;
	setAttribute(attr: PageContentAttributes): Array<PageContentAttributes>;
	unsetAttribute(attr: PageContentAttributes): Array<PageContentAttributes>;

	readonly dynamicContentServer: IDynamicContentServer;
}
