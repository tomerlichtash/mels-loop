import React from "react";
import { IToolbarItem } from "../../interfaces/IPopoverContext";
import { PopoverCloseButton } from "./popover-close-button";
import { ComponentProps } from "../../interfaces/models";
import { mlUtils } from "../../lib/ml-utils";

export interface IPopoverToolbarProps extends ComponentProps {
	showClose?: boolean;
	items: IToolbarItem[];
}

export const PopoverToolbar = ({
	items,
	className,
}: IPopoverToolbarProps): JSX.Element => {
	return (
		<div className="popover-toolbar">
			<div className="popover-toolbar-container">
				{items.map((item) => (
					<span className="popover-toolbar-item" key={mlUtils.uniqueId()}>
						{item.element}
					</span>
				))}
			</div>
			<PopoverCloseButton className="popover-toolbar-item popoverClose" />
		</div>
	);
};
