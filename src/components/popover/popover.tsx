import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { classes as triggerClasses } from "./popover-trigger.st.css";
import { classes as contentClasses } from "./popover-content.st.css";
import { classes as closeButtonClasses } from "./popover-close-button.st.css";

export interface IPopoverProps {
	trigger: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}

export const Popover = ({ trigger, children }: IPopoverProps): JSX.Element => {
	return (
		<RadixPopover.Root>
			<RadixPopover.Trigger asChild>
				<span className={triggerClasses.root}>{trigger}</span>
			</RadixPopover.Trigger>
			<RadixPopover.Content side="top" align="center" portalled={false}>
				<div className={contentClasses.root}>{children}</div>
				<RadixPopover.Close className={closeButtonClasses.root}>
					<span className={closeButtonClasses.icon}>X</span>
				</RadixPopover.Close>
				<RadixPopover.Arrow />
			</RadixPopover.Content>
		</RadixPopover.Root>
	);
};

export default Popover;
