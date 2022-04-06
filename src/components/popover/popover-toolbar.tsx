import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import { IToolbarItem } from "../../interfaces/IPopoverContext";
import CopyUrlButton from "../copy-button";
import { classes } from "./popover-toolbar.st.css";

export interface IPopoverHeaderProps {
	showClose?: boolean;
	className?: string;
	items: IToolbarItem[];
	onExit: () => void;
	query?: string;
}

export const PopoverToolbar = ({
	items,
	query,
	onExit,
}: IPopoverHeaderProps): JSX.Element => {
	return (
		<div className={classes.root}>
			<div className={classes.toolbarContainer}>
				{items.map((item) => item.element)}
			</div>

			{query && <CopyUrlButton query={query} />}

			<RadixPopover.Close className={classes.closeButton} onClick={onExit}>
				<Cross2Icon className={classes.cross} />
			</RadixPopover.Close>
		</div>
	);
};
