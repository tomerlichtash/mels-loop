import React from "react";
import { PopoverClose } from "../radix-primitives";
import { Cross2Icon } from "@radix-ui/react-icons";
import { classes } from "./popover-close-button.st.css";

export interface IPopoverCloseButtonProps {
	className?: string;
	onExit: () => void;
}

export const PopoverCloseButton = ({
	onExit,
}: IPopoverCloseButtonProps): JSX.Element => {
	return (
		<PopoverClose className={classes.root} onClick={onExit}>
			<Cross2Icon className={classes.cross} />
		</PopoverClose>
	);
};
