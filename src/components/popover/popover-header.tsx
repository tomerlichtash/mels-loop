import React, { useContext, useEffect } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import { classes } from "./popover-header.st.css";
import { ReactPopoverContext } from "../../contexts/popover-context";

export interface IPopoverHeaderProps {
	showClose?: boolean;
	className?: string;
}

export const PopoverHeader = ({
	showClose, className
}: IPopoverHeaderProps): JSX.Element => {

	const ctx = useContext(ReactPopoverContext);

	return (
		<div className={classes.headerContainer}>
			<div className={classes.toolbarContainer}>
				{ctx.toolbar.items.map( item => (item.element))}
			</div>
			<RadixPopover.Close className={classes.closeButton}>
				<Cross2Icon className={classes.cross} />
			</RadixPopover.Close>
		</div>

	);
};

export default PopoverHeader;
