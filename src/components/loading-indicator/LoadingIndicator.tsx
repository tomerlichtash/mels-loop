import React, { useEffect, useState } from 'react';
import styles from './LoadingIndicator.module.scss';
import type { LoadingIndicatorProps } from './types';

const LoadingIndicator = ({
	delay,
	label,
}: LoadingIndicatorProps): JSX.Element => {
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

export type { LoadingIndicatorProps };
