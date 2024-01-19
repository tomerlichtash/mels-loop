import React, { PropsWithChildren, useContext } from "react";
import { ComponentProps } from "../../../interfaces/models";
import {
	PopoverArrow,
	PopoverContent,
	PopoverPortal,
} from "@radix-ui/react-popover";
import PopoverToolbar from "./PopoverToolbar";
import { useTheme } from "next-themes";
import { IToolbarItem } from "@components/content/types/IPopoverContext";
import { LocaleProvider } from "locale/context/locale-context";
import styles from "./PopoverDialog.module.scss";

export type PopoverDialogProps = {
	side: "top" | "right" | "bottom" | "left";
	toolbarItems: IToolbarItem[];
} & ComponentProps;

const PopoverDialog = ({
	side,
	toolbarItems,
	children,
}: PropsWithChildren<PopoverDialogProps>) => {
	const { theme } = useTheme();
	const { locale } = useContext(LocaleProvider);

	return (
		<PopoverPortal>
			<PopoverContent
				side={side}
				// sideOffset={5}
				data-theme={theme}
				data-locale={locale}
				className={styles.root}
			>
				<PopoverToolbar items={toolbarItems} />
				<div className={styles.content}>{children}</div>
				<PopoverArrow />
			</PopoverContent>
		</PopoverPortal>
	);
};

export default PopoverDialog;
