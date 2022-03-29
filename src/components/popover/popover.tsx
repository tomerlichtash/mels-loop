import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import ScrollArea from "../scrollbar";
import { Cross2Icon } from "@radix-ui/react-icons";
import { st, classes } from "./popover.st.css";

export type CloseButtonPosition = "right" | "left";

export interface IPopoverProps {
	type: string;
	id: string;
	trigger: React.ReactNode;
	children: React.ReactNode;
	closePosX: CloseButtonPosition;
	side: CloseButtonPosition;
	forcePopover?: boolean;
	onExit?: (state: boolean) => void;
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
	onExit,
}: IPopoverProps): JSX.Element => {
	const forcePopoverProp = forcePopover ? { "data-state": "open" } : {};
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
				onInteractOutside={() => onExit(forcePopover)}
			>
				<div className={st(classes.content)}>
					<div
						className={st(classes.close, {
							posX: closePosX,
						})}
					>
						<RadixPopover.Close
							className={classes.closeButton}
							onClick={() => onExit(forcePopover)}
						>
							<Cross2Icon className={classes.cross} />
						</RadixPopover.Close>
					</div>
					<div className={st(classes.scrollable)}>
						<ScrollArea height="300px">{children}</ScrollArea>
					</div>
				</div>
				<RadixPopover.Arrow />
			</RadixPopover.Content>
		</RadixPopover.Root>
	);
};

export default Popover;
