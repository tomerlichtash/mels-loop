import { ComponentProps } from "../../../interfaces/models";

export type LinkTarget = "_blank" | null;

export interface LinkProps extends ComponentProps {
	title?: string;
	href?: string;
	target?: LinkTarget;
}
