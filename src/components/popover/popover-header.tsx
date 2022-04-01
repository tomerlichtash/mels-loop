import React, { Ref, useEffect } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import ScrollArea from "../scrollbar";
import { Cross2Icon } from "@radix-ui/react-icons";
import { st, classes } from "./popover-header.st.css";
import { rootCertificates } from "tls";

export type CloseButtonPosition = "right" | "left";

export interface IPopoverHeaderProps {
	closeOnEscape: boolean;
	showClose?: boolean;
	className?: string;
}

export const PopoverHeader = ({
	closeOnEscape
}: IPopoverHeaderProps): JSX.Element => {
	useEffect(() => {
		if (!closeOnEscape) {
			return;
		}
		const listener = (evt: KeyboardEvent) => {

		};
		window.addEventListener("keydown", listener);
		return () => {
			window.removeEventListener("keydown", listener);
		}
	}, []);

	return (
		<div className={classes.headerContainer}>
			<div className={classes.toolbarContainer}>

			</div>
			<RadixPopover.Close className={classes.closeButton}>
				<Cross2Icon className={classes.cross} />
			</RadixPopover.Close>
		</div>

	);
};

export default PopoverHeader;
