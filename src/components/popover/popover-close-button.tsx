import React from "react";
import { PopoverClose } from "../radix-primitives";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ComponentProps } from "../../interfaces/models";

export const PopoverCloseButton = (): JSX.Element => {
	return (
		<PopoverClose className="popover-close-button">
			<Cross2Icon className="cross" />
		</PopoverClose>
	);
};
