import React, { useState } from "react";
import { Share1Icon, CheckIcon } from "@radix-ui/react-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
	StyledArrow,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "../radix-primitives";
import Portalled from "../portalled";
import { ComponentProps } from "../../interfaces/models";
import {
	st as contentStyle,
	classes as contentClasses,
} from "./copy-url-button-content.st.css";
import { st, classes } from "./copy-url-button.st.css";

export interface ICopyUrlButtonProps extends ComponentProps {
	query: string;
}

const TOOLTIP_CLOSE_TIMEOUT = 1000;

export const CopyUrlButton = ({
	query,
	className,
}: ICopyUrlButtonProps): JSX.Element => {
	const [toggleCopyIcon, setToggleCopyIcon] = useState(false);

	const onCopy = () => {
		setToggleCopyIcon(true);
		setTimeout(() => setToggleCopyIcon(false), TOOLTIP_CLOSE_TIMEOUT);
	};

	return (
		<Tooltip delayDuration={0} open={toggleCopyIcon}>
			<CopyToClipboard text={query} onCopy={onCopy}>
				<TooltipTrigger asChild>
					<div
						className={st(classes.root, { checked: toggleCopyIcon }, className)}
					>
						{toggleCopyIcon ? <CheckIcon /> : <Share1Icon />}
					</div>
				</TooltipTrigger>
			</CopyToClipboard>
			<TooltipContent>
				<Portalled>
					<div className={contentStyle(contentClasses.root)}>
						Copied!
						<StyledArrow />
					</div>
				</Portalled>
			</TooltipContent>
		</Tooltip>
	);
};

export default CopyUrlButton;
