import React from "react";
import { ComponentProps } from "../../../../interfaces/models";
import Popover from "../../../popover";
import { classes } from "./popover-link.st.css";
import PopoverItem from "../../popover-item";

export interface IPopoverProps extends ComponentProps {
	children: React.ReactNode;
	url: string;
	isAnnotaion: boolean;
}

export const PopoverLink = ({
	children,
	url,
	isAnnotaion,
}: IPopoverProps): JSX.Element => {
	return (
		<Popover
			trigger={children}
			contents={<PopoverItem url={url} isAnnotaion={isAnnotaion} />}
			url={url}
			className={classes.root}
		/>
	);
};

export default PopoverLink;
