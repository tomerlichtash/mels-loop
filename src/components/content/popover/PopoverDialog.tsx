import React, { PropsWithChildren, useContext } from "react";
import { ComponentProps } from "../../../interfaces/models";
import { PopoverArrow, PopoverContent } from "@radix-ui/react-popover";
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
	const { textDirection } = useContext(LocaleProvider);
	const { theme } = useTheme();

	return (
		// <PopoverPortal>
		<PopoverContent
			side={side}
			sideOffset={5}
			className={styles.root}
			data-theme={theme}
			data-text-direction={textDirection}
		>
			<div data-theme={theme}>
				<PopoverToolbar items={toolbarItems} />
				<div className={styles.content}>{children}</div>
				<PopoverArrow />
			</div>
		</PopoverContent>
		// </PopoverPortal>
	);
};

export default PopoverDialog;
