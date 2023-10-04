import { ComponentProps } from "../../../interfaces/models";
import { LinkTarget } from "../Link/types";

export interface IListItem {
	label?: string;
	url?: string;
	target?: LinkTarget;
}

export interface IList extends ComponentProps {
	label?: string;
	items?: IListItem[];
}
