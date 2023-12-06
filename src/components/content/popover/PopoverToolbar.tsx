import React from "react";
import { PopoverClose } from "@components/primitives";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@components/ui";
import styles from "./PopoverToolbar.module.scss";

import type { IToolbarItem } from "../types/IPopoverContext";

type IPopoverToolbarProps = {
	showClose?: boolean;
	items: IToolbarItem[];
};

const PopoverToolbar = ({ items }: IPopoverToolbarProps): JSX.Element => (
	<div className={styles.root}>
		<div className={styles.container}>{items.map((item) => item.element)}</div>
		<PopoverClose asChild>
			<Button>
				<Cross2Icon />
			</Button>
		</PopoverClose>
	</div>
);

export default PopoverToolbar;
