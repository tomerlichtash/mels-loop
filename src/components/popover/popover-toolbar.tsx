import React from "react";
import { IToolbarItem } from "../../interfaces/IPopoverContext";
import { PopoverCloseButton } from "./popover-close-button";
import { st, classes } from "./popover-toolbar.st.css";
import { ComponentProps } from "../../interfaces/models";
import { mlUtils } from "../../lib/ml-utils";

export interface IPopoverToolbarProps extends ComponentProps {
	showClose?: boolean;
	items: IToolbarItem[];
}

export const PopoverToolbar = ({
	items,
	className,
}: IPopoverToolbarProps): JSX.Element => {
	return (
		<div className={st(classes.root, className)}>
			<div className={classes.toolbarContainer}>
				{items.map((item) => (
					<span className={classes.item} key={mlUtils.uniqueId()}>
						{item.element}
					</span>
				))}
			</div>
			<PopoverCloseButton
				className={st(classes.item, "popoverClose", classes.close)}
			/>
		</div>
	);
};
