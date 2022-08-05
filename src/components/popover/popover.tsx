import React from "react";
// import Portalled from "../portalled";
import { PopoverToolbar } from "./popover-toolbar";
import { IPopoverContext } from "../../interfaces/IPopoverContext";
import { Direction } from "../../interfaces/locale-context";
import { ReactPopoverContext } from "../../contexts/popover-context";
import { useToolbar } from "./useToolbar";
import { ComponentProps } from "../../interfaces/models";
import {
	PopoverRoot,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
} from "../radix-primitives";
import { st, classes } from "./popover.st.css";

export interface IPopoverProps extends ComponentProps {
	id: string;
	type: string;
	trigger: React.ReactNode;
	forcePopover?: boolean;
	query: string;
	onExit?: () => void;
	side: Direction;
	portalled?: boolean;
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
	className,
}: IPopoverProps): JSX.Element => {
	const toolbar = useToolbar();
	const ctx: IPopoverContext = {
		toolbar: toolbar.items,
		addToolbarItems: toolbar.addItems,
		removeToolbarItems: toolbar.removeItemsById,
	};

	const forceMount = forcePopover ? { "data-state": "open" } : null;

	return (
		<ReactPopoverContext.Provider value={ctx}>
			<span className={st(classes.root, { type })} {...forceMount}>
				<PopoverRoot>
					<PopoverTrigger asChild>
						<span className={classes.trigger} tabIndex={1}>
							<span className={st(classes.triggerWrapper)}>{trigger}</span>
						</span>
					</PopoverTrigger>
					<PopoverContent
						side={side}
						forceMount={forceMount}
						avoidCollisions={true}
						align="center"
						sideOffset={5}
						// portalled={portalled}
					>
						{/* <Portalled> */}
						<div className={st(classes.content, className)}>
							<PopoverToolbar
								query={query}
								items={toolbar.items}
								onExit={onExit}
								className={st(classes.toolbar, className)}
							/>
							{children}
						</div>
						<PopoverArrow />
						{/* </Portalled> */}
					</PopoverContent>
				</PopoverRoot>
			</span>
		</ReactPopoverContext.Provider>
	);
};

export default Popover;
