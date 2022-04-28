import React from "react";
import { IToolbarItem } from "../../interfaces/IPopoverContext";
import { PopoverCloseButton } from "./popover-close-button";
import CopyUrlButton from "../copy-button";
import { st, classes } from "./popover-toolbar.st.css";
import { ComponentProps } from "../../interfaces/models";

export interface IPopoverToolbarProps extends ComponentProps {
	showClose?: boolean;
	items: IToolbarItem[];
	onExit: () => void;
	query?: string;
}

export const PopoverToolbar = ({
	items,
	onExit,
	query,
	className,
}: IPopoverToolbarProps): JSX.Element => {
	return (
		<div className={st(classes.root, className)}>
			<div className={classes.toolbarContainer}>
				{items.map((item) => (
					<>
						<span className={classes.item}>{item.element}</span>
					</>
				))}
			</div>
			{query && (
				<CopyUrlButton
					query={query}
					className={st(classes.copy, classes.item)}
				/>
			)}
			<PopoverCloseButton
				onExit={onExit}
				className={st(classes.item, classes.close)}
			/>
		</div>
	);
};
