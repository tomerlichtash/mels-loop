import React, { useEffect, useState } from "react";
import styles from "./LoadingIndicator.module.scss";

type ILoadingIndicatorProps = {
	/**
	 * Number of MILLISECONDS to wait before displaying
	 */
	readonly delay: number;
	readonly label?: string;
};

export const LoadingIndicator = ({
	delay,
	label,
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
		<div className={styles.root}>
			<div className={styles.image}></div>
			{label && <div className={styles.label}>{label}</div>}
		</div>
	);
};

export default LoadingIndicator;
