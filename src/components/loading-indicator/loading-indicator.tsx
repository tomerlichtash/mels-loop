import React, { useContext, useEffect, useState } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { ComponentProps } from "../../interfaces/models";

export interface ILoadingIndicatorProps extends ComponentProps {
	/**
	 * Number of MILLISECONDS to wait before displaying
	 */
	readonly delay: number;
	readonly label?: string;
}

export const LoadingIndicator = ({
	delay,
	label,
	className,
}: ILoadingIndicatorProps): JSX.Element => {
	const { translate } = useContext(ReactLocaleContext);
	const [show, setShow] = useState(false);
	useEffect(() => {
		let removed = false;
		setTimeout(() => {
			if (!removed) {
				setShow(true);
			}
		}, Math.round(delay));
		return () => {
			removed = true;
		};
	}, [delay]);
	if (!show) {
		return <></>;
	}
	return (
		<div className="loading-indicator">
			<div className="loading-indicator-container">
				<div className="loading-indicator-animation"></div>
				{label && (
					<div className="loading-indicator-label">{translate(label)}</div>
				)}
			</div>
		</div>
	);
};

export default LoadingIndicator;
