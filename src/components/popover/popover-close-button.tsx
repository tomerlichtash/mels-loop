import React from "react";
import { PopoverClose } from "../radix-primitives";
import { Cross2Icon } from "@radix-ui/react-icons";
import { st, classes } from "./popover-close-button.st.css";
import { ComponentProps } from "../../interfaces/models";

export interface IPopoverCloseButtonProps extends ComponentProps {
	onExit: () => void;
}

export const PopoverCloseButton = ({
	onExit,
	className,
}: IPopoverCloseButtonProps): JSX.Element => {
	return (
		<PopoverClose className={st(classes.root, className)} onClick={onExit}>
			<Cross2Icon className={classes.cross} />
		</PopoverClose>
	);
};
