import React, { useRef } from "react";
import PopoverToolbar from "./PopoverToolbar";
import { ReactPopoverContext } from "../../../contexts/popover-context";
import { useToolbar } from "./useToolbar";
import {
	PopoverRoot,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
	PopoverPortal,
} from "@components/primitives";
import classNames from "classnames";
import styles from "./Popover.module.scss";
import type { ComponentProps } from "../../../interfaces/models";
import type { IPopoverContext } from "../../../interfaces/IPopoverContext";
import type { Direction } from "../../../locale/locale-context";

export type IPopoverProps = {
	trigger: React.ReactNode;
	side: Direction;
} & ComponentProps;

const Popover = ({
	trigger,
	children,
	side,
	className,
}: IPopoverProps): JSX.Element => {
	const toolbar = useToolbar();

	const ctx: IPopoverContext = {
		toolbar: toolbar.items,
		addToolbarItems: toolbar.addItems,
		removeToolbarItems: toolbar.removeItemsById,
	};

	return (
		<ReactPopoverContext.Provider value={ctx}>
			<span className={classNames(styles.root, className)}>
				<PopoverRoot>
					<PopoverTrigger asChild>
						<span className={styles.trigger} tabIndex={1}>
							{trigger}
						</span>
					</PopoverTrigger>
					<PopoverPortal>
						<PopoverContent
							side={side}
							avoidCollisions={true}
							sideOffset={5}
							className={styles.dialog}
							data-theme="light"
							data-text-direction="ltr"
						>
							<div data-theme="light">
								<PopoverToolbar items={toolbar.items} />
								<div className={styles.content}>{children}</div>
								<PopoverArrow />
							</div>
						</PopoverContent>
					</PopoverPortal>
				</PopoverRoot>
			</span>
		</ReactPopoverContext.Provider>
	);
};

export default Popover;
