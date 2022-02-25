import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentIterator } from "../../content-iterator";
import * as Popover from "@radix-ui/react-popover";
import { classes } from "./popover-link.st.css";
import * as PopoverPrimitive from "@radix-ui/react-popover";

export const PopoverLink = (props: ContentComponentProps): JSX.Element => {
	const p = props.componentData.node;
	return (
		<Popover.Root>
			<Popover.Trigger className={classes.popOverTrigger} asChild>
				<span>
					<ContentIterator componentData={props.componentData} />
				</span>
			</Popover.Trigger>
			<Popover.Content
				side="top"
				align="center"
				className={classes.popOverContent}
			>
				<h1>title</h1>
				<p>some text some text some text some text some text some text </p>
				<Popover.Close>Close</Popover.Close>
				<Popover.Arrow className={classes.popOverArrow} />
			</Popover.Content>
		</Popover.Root>
	);
};

export default PopoverLink;
