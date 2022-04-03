import React, { useState } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
// import { PortalRoot } from "../portal";
import ScrollArea from "../scrollbar";
import { Cross2Icon, ExternalLinkIcon, CheckIcon } from "@radix-ui/react-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { st, classes } from "./popover.st.css";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipArrow,
} from "../tooltip";

export type CloseButtonPosition = "right" | "left";

export interface IPopoverProps {
	type: string;
	id: string;
	trigger: React.ReactNode;
	children: React.ReactNode;
	popoverRef: React.RefObject<HTMLElement>;
	closePosX: CloseButtonPosition;
	side: CloseButtonPosition;
	forcePopover?: boolean;
	query: string;
	onExit?: () => void;
	className?: string;
}

export const Popover = ({
	type,
	id,
	trigger,
	children,
	side,
	closePosX,
	forcePopover,
	query,
	// popoverRef,
	onExit,
}: IPopoverProps): JSX.Element => {
	const forcePopoverProp = forcePopover ? { "data-state": "open" } : {};
	const [toggleCopyIcon, setToggleCopyIcon] = useState(false);

	const onCopy = () => {
		setToggleCopyIcon(true);
		setTimeout(() => setToggleCopyIcon(false), 1000);
	};
	const copyIcon = toggleCopyIcon ? <CheckIcon /> : <ExternalLinkIcon />;
	const copyButton = (
		<Tooltip delayDuration={0} open={toggleCopyIcon}>
			<CopyToClipboard text={query} onCopy={onCopy}>
				<TooltipTrigger>{copyIcon}</TooltipTrigger>
			</CopyToClipboard>
			<TooltipContent className={st(classes.copyButtonContent)}>
				Copied!
				<TooltipArrow className={st(classes.copyButtonTooltipArrow)} />
			</TooltipContent>
		</Tooltip>
	);

	return (
		<RadixPopover.Root>
			<RadixPopover.Trigger asChild>
				<span className={st(classes.root, { type })} {...forcePopoverProp}>
					<span className={classes.trigger} tabIndex={1} data-link-id={id}>
						<span className={st(classes.triggerWrapper)}>{trigger}</span>
					</span>
				</span>
			</RadixPopover.Trigger>
			<RadixPopover.Content
				forceMount={forcePopover ? forcePopover : null}
				side={side}
				align="center"
				portalled={false}
				sideOffset={5}
				avoidCollisions={true}
				onInteractOutside={onExit}
			>
				{/* <PortalRoot containerRef={popoverRef}> */}
				<div className={st(classes.content)}>
					<div
						className={st(classes.close, {
							posX: closePosX,
						})}
					>
						<RadixPopover.Close
							className={classes.closeButton}
							onClick={onExit}
						>
							<Cross2Icon className={classes.cross} />
						</RadixPopover.Close>
					</div>
					<div className={st(classes.scrollable)}>
						{copyButton}
						<ScrollArea>{children}</ScrollArea>
					</div>
				</div>
				<RadixPopover.Arrow />
				{/* </PortalRoot> */}
			</RadixPopover.Content>
		</RadixPopover.Root>
	);
};

export default Popover;
