import React from "react";
import { PopoverClose } from "@components/primitives";
import { IToolbarItem } from "../../../../interfaces/IPopoverContext";
import { ComponentProps } from "../../../../interfaces/models";
import { mlUtils } from "../../../../lib/ml-utils";
import styles from "./PopoverToolbar.module.scss";
import classNames from "classnames";
import { Cross2Icon } from "@radix-ui/react-icons";

export interface IPopoverToolbarProps extends ComponentProps {
	showClose?: boolean;
	items: IToolbarItem[];
}

const PopoverToolbar = ({
	items,
	className,
}: IPopoverToolbarProps): JSX.Element => (
	<div className={classNames([styles.root, className])}>
		<div className={styles.container}>
			{items.map((item) => (
				<span className={styles.item} key={mlUtils.uniqueId()}>
					{item.element}
				</span>
			))}
		</div>
		<PopoverClose className={styles.close}>
			<Cross2Icon />
		</PopoverClose>
	</div>
);

export default PopoverToolbar;
