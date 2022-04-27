import React from "react";
import ScrollArea from "../scrollbar";
import { PopoverToolbar } from "./popover-toolbar";
import { IPopoverContext } from "../../interfaces/IPopoverContext";
import { Direction } from "../../interfaces/locale-context";
import { ReactPopoverContext } from "../../contexts/popover-context";
import { useToolbar } from "./useToolbar";
import { st, classes } from "./popover.st.css";

import {
	PopoverRoot,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
} from "../radix-primitives";

export interface IPopoverProps {
	id: string;
	type: string;
	trigger: React.ReactNode;
	children: React.ReactNode;
	forcePopover?: boolean;
	query: string;
	onExit?: () => void;
	side: Direction;
	portalled?: boolean;
	portalStyles?: string;
	contentClassName?: string;
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
	portalled,
	portalStyles,
	contentClassName,
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
			<PopoverRoot>
				<PopoverTrigger asChild>
					<span className={st(classes.root, { type })} {...forcePopoverProp}>
						<span className={classes.trigger} tabIndex={1}>
							<span className={st(classes.triggerWrapper)}>{trigger}</span>
						</span>
					</span>
				</PopoverTrigger>
				<PopoverContent
					side={side}
					forceMount={forcePopover ? forcePopover : null}
					avoidCollisions={true}
					align="center"
					sideOffset={5}
					portalled={portalled}
					className={portalStyles}
				>
					<div className={st(classes.content, contentClassName)}>
						<PopoverToolbar
							query={query}
							items={toolbar.items}
							onExit={onExit}
							className={st(classes.toolbar, "popoverToolbar")}
						/>
						<div className={st(classes.scrollable)}>
							<ScrollArea height="300px">{children}</ScrollArea>
						</div>
					</div>
					<PopoverArrow />
				</PopoverContent>
			</PopoverRoot>
		</ReactPopoverContext.Provider>
	);
};

export default Popover;
