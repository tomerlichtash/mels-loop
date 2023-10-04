import { ComponentProps } from "../../../interfaces/models";

export type LinkTarget = "_blank" | null;

export interface LinkProps extends ComponentProps {
	label?: string;
	href?: string;
	target?: LinkTarget;
}
