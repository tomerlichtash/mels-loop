import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import ScrollArea from "../scrollbar";
import { PopoverToolbar } from "./popover-toolbar";
import { Direction } from "../../interfaces/layout-context";
import { IPopoverContext } from "../../interfaces/IPopoverContext";
import { ReactPopoverContext } from "../../contexts/popover-context";
import { useToolbar } from "./useToolbar";
import { st, classes } from "./popover.st.css";
// import * as Portal from "@radix-ui/react-portal";

export interface IPopoverProps {
	id: string;
	type: string;
	trigger: React.ReactNode;
	children: React.ReactNode;
	popoverRef: React.RefObject<HTMLElement>;
	forcePopover?: boolean;
	query: string;
	onExit?: () => void;
	side: Direction;
	open?: boolean /* used for story simulation */;
	className?: string;
}

export const Popover = ({
	type,
	trigger,
	children,
	side,
	forcePopover,
	onExit,
	query,
	open,
}: IPopoverProps): JSX.Element => {
	const toolbar = useToolbar();
	const ctx: IPopoverContext = {
		toolbar: toolbar.items,
		addToolbarItems: toolbar.addItems,
		removeToolbarItems: toolbar.removeItemsById,
	};

	const forcePopoverProp = forcePopover ? { "data-state": "open" } : {};

	return (
		<ReactPopoverContext.Provider value={ctx}>
			<RadixPopover.Root open={open}>
				<RadixPopover.Trigger asChild>
					<span className={st(classes.root, { type })} {...forcePopoverProp}>
						<span className={classes.trigger} tabIndex={1}>
							<span className={st(classes.triggerWrapper)}>{trigger}</span>
						</span>
					</span>
				</RadixPopover.Trigger>
				{/* <Portal.Root containerRef={popoverRef}> */}
				<RadixPopover.Content
					forceMount={forcePopover ? forcePopover : null}
					side={side}
					align="center"
					portalled={false}
					sideOffset={5}
					avoidCollisions={true}
				>
					<div className={st(classes.content)}>
						<div className={st(classes.scrollable)}>
							<ScrollArea height="300px">{children}</ScrollArea>
						</div>
					</div>
					<RadixPopover.Arrow />
					{/* </Portal.Root> */}
					<PopoverToolbar items={toolbar.items} query={query} onExit={onExit} />
				</RadixPopover.Content>
			</RadixPopover.Root>
		</ReactPopoverContext.Provider>
	);
};

export default Popover;
