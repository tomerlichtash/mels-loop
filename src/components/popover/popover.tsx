import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import ScrollArea from "../scrollbar";
import { Cross2Icon } from "@radix-ui/react-icons";
import { st, classes } from "./popover.st.css";
import PopoverHeader from "./popover-header";
import { Direction } from "../../interfaces/layout-context";
import { IPopoverContext } from "../../interfaces/IPopoverContext";
import { ReactPopoverContext } from "../../contexts/popover-context";
import { useToolbar } from "./useToolbar";

export interface IPopoverProps {
	type: string;
	trigger: React.ReactNode;
	children: React.ReactNode;
	side: Direction;
	className?: string;
}

export const Popover = ({
	type,
	trigger,
	children,
	side,
}: IPopoverProps): JSX.Element => {
	const { toolbar } = useToolbar(); 
	const ctx: IPopoverContext = {
		toolbar
	};

	return (
		<ReactPopoverContext.Provider value={ctx}>
			<RadixPopover.Root>
				<RadixPopover.Trigger asChild>
					<span className={st(classes.root, { type })}>
						<span className={classes.trigger} tabIndex={1}>
							<span className={st(classes.triggerWrapper)}>{trigger}</span>
						</span>
					</span>
				</RadixPopover.Trigger>
				<RadixPopover.Content
					side={side}
					align="center"
					portalled={false}
					sideOffset={5}
					avoidCollisions={true}
				>
					<PopoverHeader />
					<div className={st(classes.content)}>
						<div className={st(classes.scrollable)}>
							<ScrollArea height="300px">{children}</ScrollArea>
						</div>
					</div>
					<RadixPopover.Arrow />
				</RadixPopover.Content>
			</RadixPopover.Root>
		</ReactPopoverContext.Provider>
	);
};

export default Popover;
