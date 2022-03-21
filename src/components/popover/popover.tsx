import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import {
	st as triggerStyle,
	classes as triggerClasses,
} from "./popover-trigger.st.css";
import { classes as contentClasses } from "./popover-content.st.css";
import {
	st as closeButtonStyle,
	classes as closeButtonClasses,
} from "./popover-close-button.st.css";

export type ICloseButtonPosition = "right" | "left";

export interface IPopoverProps {
	type: string;
	trigger: React.ReactNode;
	children: React.ReactNode;
	closePosX: ICloseButtonPosition;
}

export const Popover = ({
	type,
	trigger,
	children,
	closePosX,
}: IPopoverProps): JSX.Element => {
	return (
		<RadixPopover.Root>
			<RadixPopover.Trigger
				className={triggerStyle(triggerClasses.root, { type })}
			>
				{trigger}
			</RadixPopover.Trigger>
			<RadixPopover.Content side="top" align="center" portalled={false}>
				<div className={contentClasses.root}>{children}</div>
				<RadixPopover.Close
					className={closeButtonStyle(closeButtonClasses.root, {
						posX: closePosX,
					})}
				>
					<span className={closeButtonClasses.icon}>X</span>
				</RadixPopover.Close>
				<RadixPopover.Arrow />
			</RadixPopover.Content>
		</RadixPopover.Root>
	);
};

export default Popover;
