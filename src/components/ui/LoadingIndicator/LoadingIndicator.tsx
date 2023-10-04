import React, { useEffect, useState } from "react";
import { ComponentProps } from "../../../interfaces/models";
import classNames from "classnames";
import styles from "./LoadingIndicator.module.scss";

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
		<div className={classNames([styles.root, className])}>
			<div className="loading-indicator-container">
				<div className="loading-indicator-animation"></div>
				{label && <div className="loading-indicator-label">{label}</div>}
			</div>
		</div>
	);
};

export default LoadingIndicator;
