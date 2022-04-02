import React, { useState } from "react";
import { ExternalLinkIcon, CheckIcon } from "@radix-ui/react-icons";
import { ContentComponentProps } from "../../interfaces/models";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
	StyledArrow,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "../tooltip/tooltip";
// import { st, classes } from "./copy-button.st.css";

export interface CopyButtonProps extends ContentComponentProps {
	query: string;
}

export const CopyButton = (props): JSX.Element => {
	const [toggleCopyIcon, setToggleCopyIcon] = useState(false);
	const copyIcon = toggleCopyIcon ? <CheckIcon /> : <ExternalLinkIcon />;
	const onCopy = () => {
		setToggleCopyIcon(true);
		setTimeout(() => setToggleCopyIcon(false), 1000);
	};
	return (
		<Tooltip delayDuration={0} open={toggleCopyIcon}>
			<CopyToClipboard text={props.query} onCopy={onCopy}>
				<TooltipTrigger>{copyIcon}</TooltipTrigger>
			</CopyToClipboard>
			<TooltipContent>
				Copied!
				<StyledArrow />
			</TooltipContent>
		</Tooltip>
	);
};

export default CopyButton;
