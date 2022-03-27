import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { st, classes } from "./popover.st.css";

export type ICloseButtonPosition = "right" | "left";

export interface IPopoverProps {
	type: string;
	trigger: React.ReactNode;
	children: React.ReactNode;
	closePosX: ICloseButtonPosition;
	className?: string;
}

export const Popover = ({
	type,
	trigger,
	children,
	closePosX,
}: IPopoverProps): JSX.Element => {
	return (
		<RadixPopover.Root>
			<RadixPopover.Trigger asChild>
				<span className={st(classes.root, { type })}>
					<span className={classes.trigger} tabIndex={1}>
						{trigger}
					</span>
				</span>
			</RadixPopover.Trigger>
			<RadixPopover.Content side="right" align="center" portalled={false}>
				<div className={st(classes.content)}>
					<div className={classes.close}>
						<RadixPopover.Close
							className={st(classes.closeButton, {
								posX: closePosX,
							})}
						>
							<span className={classes.closeIcon}>X</span>
						</RadixPopover.Close>
					</div>
					{children}
				</div>
				<RadixPopover.Arrow />
			</RadixPopover.Content>
		</RadixPopover.Root>
	);
};

export default Popover;
