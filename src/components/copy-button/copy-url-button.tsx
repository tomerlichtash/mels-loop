import React, { useContext, useEffect, useState } from "react";
import { Share1Icon, CheckIcon } from "@radix-ui/react-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ReactLocaleContext } from "../../contexts/locale-context";
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
import {
	st as triggerStyle,
	classes as triggerClasses,
} from "./copy-url-button-trigger.st.css";

export interface ICopyUrlButtonProps extends ComponentProps {
	query: string;
}

const TOOLTIP_CLOSE_TIMEOUT = 1000;

export const CopyUrlButton = ({
	query,
	className,
}: ICopyUrlButtonProps): JSX.Element => {
	const [toggleCopyIcon, setToggleCopyIcon] = useState(false);

	useEffect(() => {
		const timer = setTimeout(
			() => setToggleCopyIcon(false),
			TOOLTIP_CLOSE_TIMEOUT
		);
		return () => clearTimeout(timer);
	}, [toggleCopyIcon]);

	const onCopy = () => setToggleCopyIcon(true);

	const { translate } = useContext(ReactLocaleContext);
	return (
		<Tooltip delayDuration={0} open={toggleCopyIcon}>
			<CopyToClipboard text={query} onCopy={onCopy}>
				<TooltipTrigger asChild>
					<div
						className={triggerStyle(
							triggerClasses.root,
							{ checked: toggleCopyIcon },
							className
						)}
					>
						{toggleCopyIcon ? <CheckIcon /> : <Share1Icon />}
					</div>
				</TooltipTrigger>
			</CopyToClipboard>
			<TooltipContent>
				<Portalled>
					<div className={contentStyle(contentClasses.root)}>
						{translate("COPY_BUTTON_TOOLTIP_CONTENT")}
						<StyledArrow className={contentClasses.tooltipArrow} />
					</div>
				</Portalled>
			</TooltipContent>
		</Tooltip>
	);
};

export default CopyUrlButton;
