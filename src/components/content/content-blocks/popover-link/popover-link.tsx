import React from "react";
import { ComponentProps } from "../../../../interfaces/models";
import Popover from "../../../popover";
import PopoverItem from "../../popover-item";
import { classes } from "./popover-link.st.css";

export interface IPopoverProps extends ComponentProps {
	children: React.ReactNode;
	url: string;
}

export const PopoverLink = ({ children, url }: IPopoverProps): JSX.Element => {
	return (
		<Popover
			trigger={children}
			contents={<PopoverItem url={url} />}
			className={classes.root}
		/>
	);
};

export default PopoverLink;
