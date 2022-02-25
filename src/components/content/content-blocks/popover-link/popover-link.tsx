import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentIterator } from "../../content-iterator";
import * as Popover from "@radix-ui/react-popover";
import { classes } from "./popover-link.st.css";

export const PopoverLink = (props: ContentComponentProps): JSX.Element => {
	// const p = props.componentData.node;
	return (
		<div className={classes.root}>
			<Popover.Root>
				<Popover.Trigger className={classes.trigger} asChild>
					<span className={classes.triggerInner}>
						<ContentIterator componentData={props.componentData} />
					</span>
				</Popover.Trigger>
				<Popover.Content side="top" align="center" className={classes.content}>
					<h1>title</h1>
					<p>some text</p>
					<Popover.Close className={classes.closeButton}>Close</Popover.Close>
					<Popover.Arrow className={classes.arrow} />
				</Popover.Content>
			</Popover.Root>
		</div>
	);
};

export default PopoverLink;
