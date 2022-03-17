import React from "react";
import { ComponentProps } from "../../interfaces/models";
import * as RadixPopover from "@radix-ui/react-popover";
import { st, classes } from "./popover.st.css";

export interface IPopoverProps extends ComponentProps {
	trigger: React.ReactNode;
	contents: React.ReactNode;
	url: string;
	className?: string;
}

export const Popover = ({
	trigger,
	contents,
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
					{contents}
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
