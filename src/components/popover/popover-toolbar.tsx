import React from "react";
import { IToolbarItem } from "../../interfaces/IPopoverContext";
import { PopoverCloseButton } from "./popover-close-button";
// import CopyUrlButton from "../copy-button";
import { st, classes } from "./popover-toolbar.st.css";

export interface IPopoverToolbarProps {
	showClose?: boolean;
	className?: string;
	items: IToolbarItem[];
	onExit: () => void;
	query?: string;
}

export const PopoverToolbar = ({
	items,
	onExit,
	className,
}: IPopoverToolbarProps): JSX.Element => {
	return (
		<div className={st(classes.root, className)}>
			<div className={classes.toolbarContainer}>
				{items.map((item) => item.element)}
			</div>
			{/* {query && <CopyUrlButton query={query} />} */}
			<PopoverCloseButton onExit={onExit} />
		</div>
	);
};
