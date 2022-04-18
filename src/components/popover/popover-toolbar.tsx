import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { IToolbarItem } from "../../interfaces/IPopoverContext";
import CopyUrlButton from "../copy-button";
import { PopoverClose } from "../radix-primitives";
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

			<PopoverClose className={classes.closeButton} onClick={onExit}>
				<Cross2Icon className={classes.cross} />
			</PopoverClose>
		</div>
	);
};
