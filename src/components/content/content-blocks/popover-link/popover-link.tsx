import React from "react";
import { ComponentProps } from "../../../../interfaces/models";
import * as Popover from "@radix-ui/react-popover";
import { classes } from "./popover-link.st.css";
import GlossaryItem from "../../glossary-item";

export interface IPopoverProps extends ComponentProps {
	children: React.ReactNode;
	url: string;
}

export const PopoverLink = (props: IPopoverProps): JSX.Element => {
	return (
		<span className={classes.root}>
			<Popover.Root>
				<Popover.Trigger className={classes.trigger} asChild>
					<span className={classes.triggerInner}>
						{props.children}
					</span>
				</Popover.Trigger>
				<Popover.Content side="top" align="center" className={classes.content}>
					<GlossaryItem url={props.url} />
					<Popover.Close className={classes.closeButton}>X</Popover.Close>
					<Popover.Arrow className={classes.arrow} />
				</Popover.Content>
			</Popover.Root>
		</span>
	);
};

export default PopoverLink;
