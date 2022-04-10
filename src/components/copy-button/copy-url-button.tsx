import React, { useState } from "react";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
	StyledArrow,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "../radix-primitives";
import { classes } from "./copy-url-button.st.css";

export interface ICopyUrlButtonProps {
	query: string;
	className?: string;
}

const TOOLTIP_CLOSE_TIMEOUT = 1000;

export const CopyUrlButton = ({ query }: ICopyUrlButtonProps): JSX.Element => {
	const [toggleCopyIcon, setToggleCopyIcon] = useState(false);

	const onCopy = () => {
		setToggleCopyIcon(true);
		setTimeout(() => setToggleCopyIcon(false), TOOLTIP_CLOSE_TIMEOUT);
	};

	return (
		<Tooltip delayDuration={0} open={toggleCopyIcon}>
			<CopyToClipboard text={query} onCopy={onCopy}>
				<TooltipTrigger asChild>
					<div className={classes.root}>
						{toggleCopyIcon ? <CheckIcon /> : <CopyIcon />}
					</div>
				</TooltipTrigger>
			</CopyToClipboard>
			<TooltipContent asChild>
				<div className={classes.content}>
					Copied!
					<StyledArrow />
				</div>
			</TooltipContent>
		</Tooltip>
	);
};

export default CopyUrlButton;
