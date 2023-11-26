import React from "react";
import { PopoverClose } from "@components/primitives";
import { IToolbarItem } from "../../../../interfaces/IPopoverContext";
import { ComponentProps } from "../../../../interfaces/models";
import styles from "./PopoverToolbar.module.scss";
import classNames from "classnames";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@components/ui";

export interface IPopoverToolbarProps extends ComponentProps {
	showClose?: boolean;
	items: IToolbarItem[];
}

const PopoverToolbar = ({
	items,
	className,
}: IPopoverToolbarProps): JSX.Element => (
	<div className={classNames(styles.root, className)}>
		<div className={styles.container}>{items.map((item) => item.element)}</div>
		<PopoverClose asChild>
			<Button>
				<Cross2Icon />
			</Button>
		</PopoverClose>
	</div>
);

export default PopoverToolbar;
