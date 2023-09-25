import React from "react";
import { IToolbarItem } from "../../interfaces/IPopoverContext";
import { PopoverCloseButton } from "./popover-close-button";
import { ComponentProps } from "../../interfaces/models";
import { mlUtils } from "../../lib/ml-utils";
import styles from "./popover-toolbar.module.scss";

export interface IPopoverToolbarProps extends ComponentProps {
	showClose?: boolean;
	items: IToolbarItem[];
}

export const PopoverToolbar = ({
	items,
	className,
}: IPopoverToolbarProps): JSX.Element => {
	return (
		<div className={styles.root}>
			<div className="popover-toolbar-container">
				{items.map((item) => (
					<span className="popover-toolbar-item" key={mlUtils.uniqueId()}>
						{item.element}
					</span>
				))}
			</div>
			<PopoverCloseButton />
		</div>
	);
};
