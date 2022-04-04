import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import { classes } from "./popover-header.st.css";
import { IToolbarItem } from "../../interfaces/IPopoverContext";

export interface IPopoverHeaderProps {
	showClose?: boolean;
	className?: string;
	items: IToolbarItem[];
}

export const PopoverHeader = ({
	showClose,
	items
}: IPopoverHeaderProps): JSX.Element => {

	return (
		<div className={classes.headerContainer}>
			<div className={classes.toolbarContainer}>
				{items.map( item => (item.element))}
			</div>
			{ showClose !== false && (
			<RadixPopover.Close className={classes.closeButton}>
				<Cross2Icon className={classes.cross} />
			</RadixPopover.Close>
			)}
		</div>

	);
};
