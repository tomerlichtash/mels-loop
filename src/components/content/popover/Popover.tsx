import React, { PropsWithChildren } from "react";
import { PopoverProvider } from "./PopoverContext";
import { PopoverRoot } from "@components/primitives";
import PopoverTrigger from "./PopoverTrigger";
import PopoverDialog from "./PopoverDialog";
import { useToolbar } from "../dynamic-content-toolbar/useToolbar";
import type { IPopoverContext } from "../types/IPopoverContext";
import type { Direction } from "../../../locale/locale-context";

type PopoverProps = {
	trigger: React.ReactNode;
	side: Direction;
};

const Popover = ({
	trigger,
	children,
	side,
}: PropsWithChildren<PopoverProps>) => {
	const toolbar = useToolbar();

	const context: IPopoverContext = {
		toolbar: toolbar.items,
		addToolbarItems: toolbar.addItems,
		removeToolbarItems: toolbar.removeItemsById,
	};

	return (
		<PopoverProvider value={context}>
			<PopoverRoot>
				<PopoverTrigger>{trigger}</PopoverTrigger>
				<PopoverDialog side={"top"} toolbarItems={toolbar.items}>
					{children}
				</PopoverDialog>
			</PopoverRoot>
		</PopoverProvider>
	);
};

export default Popover;
