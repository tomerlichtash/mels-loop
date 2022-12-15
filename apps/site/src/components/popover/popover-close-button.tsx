import React from "react";
import { PopoverClose } from "../radix-primitives";
import { Cross2Icon } from "@radix-ui/react-icons";
import { st, classes } from "./popover-close-button.st.css";
import { ComponentProps } from "../../interfaces/models";

export const PopoverCloseButton = ({
	className,
}: ComponentProps): JSX.Element => {
	return (
		<PopoverClose className={st(classes.root, className)}>
			<Cross2Icon className={classes.cross} />
		</PopoverClose>
	);
};
