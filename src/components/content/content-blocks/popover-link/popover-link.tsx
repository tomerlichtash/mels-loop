import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentIterator } from "../../content-iterator";
import * as Popover from "@radix-ui/react-popover";
import { classes } from "./popover-link.st.css";
import GlossaryItem from "../../glossary-item";

export const PopoverLink = (props: ContentComponentProps): JSX.Element => {
	const p = props.componentData.node;
	const url = p.target;
	return (
		<span className={classes.root}>
			<Popover.Root>
				<Popover.Trigger className={classes.trigger} asChild>
					<span className={classes.triggerInner}>
						<ContentIterator componentData={props.componentData} />
					</span>
				</Popover.Trigger>
				<Popover.Content side="top" align="center" className={classes.content}>
					<GlossaryItem url={url} />
					<Popover.Close className={classes.closeButton}>Close</Popover.Close>
					<Popover.Arrow className={classes.arrow} />
				</Popover.Content>
			</Popover.Root>
		</span>
	);
};

export default PopoverLink;
