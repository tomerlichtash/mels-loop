import React, { useState } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
// import * as Portal from "@radix-ui/react-portal";
import ScrollArea from "../scrollbar";
import { ExternalLinkIcon, CheckIcon } from "@radix-ui/react-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { PopoverHeader } from "./popover-header";

import { Direction } from "../../interfaces/layout-context";
import { IPopoverContext } from "../../interfaces/IPopoverContext";
import { ReactPopoverContext } from "../../contexts/popover-context";
import { useToolbar } from "./useToolbar";

import {
	StyledArrow,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "../tooltip/tooltip";

import { st, classes } from "./popover.st.css";

export interface IPopoverProps {
	type: string;
	id: string;
	trigger: React.ReactNode;
	children: React.ReactNode;
	popoverRef: React.RefObject<HTMLElement>;
	forcePopover?: boolean;
	query: string;
	onExit?: () => void;
	side: Direction;
	className?: string;
}

export const Popover = ({
	type,
	trigger,
	children,
	side,
	forcePopover,
	query,
}: IPopoverProps): JSX.Element => {
	const toolbar = useToolbar();
	const ctx: IPopoverContext = {
		toolbar: toolbar.items,
		addToolbarItems: toolbar.addItems,
		removeToolbarItems: toolbar.removeItemsById,
	};

	const forcePopoverProp = forcePopover ? { "data-state": "open" } : {};
	const [toggleCopyIcon, setToggleCopyIcon] = useState(false);

	const onCopy = () => {
		setToggleCopyIcon(true);
		setTimeout(() => setToggleCopyIcon(false), 1000);
	};
	const copyIcon = toggleCopyIcon ? <CheckIcon /> : <ExternalLinkIcon />;

	const tooltip = (
		<Tooltip delayDuration={0} open={toggleCopyIcon}>
			<CopyToClipboard text={query} onCopy={onCopy}>
				<TooltipTrigger>{copyIcon}</TooltipTrigger>
			</CopyToClipboard>
			<TooltipContent>
				Copied!
				<StyledArrow />
			</TooltipContent>
		</Tooltip>
	);

	return (
		<ReactPopoverContext.Provider value={ctx}>
			<RadixPopover.Root>
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
					<PopoverHeader items={toolbar.items} />
					<div className={st(classes.content)}>
						<div className={st(classes.scrollable)}>
							<ScrollArea height="300px">{children}</ScrollArea>
						</div>
					</div>
					<RadixPopover.Arrow />
					{tooltip}

					{/* </Portal.Root> */}
				</RadixPopover.Content>
			</RadixPopover.Root>
		</ReactPopoverContext.Provider>
	);
};

export default Popover;
