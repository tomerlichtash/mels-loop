import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { st, classes } from "./popover.st.css";

export interface IPopoverProps {
	trigger: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}

export const Popover = ({
	trigger,
	children,
	className,
}: IPopoverProps): JSX.Element => {
	return (
		<span className={st(classes.root, className)}>
			<RadixPopover.Root>
				<RadixPopover.Trigger className={classes.trigger} asChild>
					<span className={classes.triggerInner}>{trigger}</span>
				</RadixPopover.Trigger>
				<RadixPopover.Content
					side="top"
					align="center"
					className={classes.content}
				>
					{children}
					<RadixPopover.Close className={classes.closeButton}>
						<span className={classes.x}>X</span>
					</RadixPopover.Close>
					<RadixPopover.Arrow className={classes.arrow} />
				</RadixPopover.Content>
			</RadixPopover.Root>
		</span>
	);
};

export default Popover;
