import React, { useContext, useEffect, useState } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import Portalled from "../portalled";
import { ComponentProps } from "../../interfaces/models";
import {
	st,
	classes,
} from "./loading-indicator.st.css";

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
				console.log("setting show to true after", Math.round(delay * 1000));
				setShow(true);
			}
		}, Math.round(delay))
		return () => {
			removed = true;
		}
	}, [])
	if (!show) {
		return <></>
	}
	return (

		<div className={st(className, classes.loadingContainer)}>
			<div className={st(classes.loadingAnimation, classes.rotate)}></div>
			{label && (
				<span className={st(className, classes.loadingLabel)}>{translate(label)}</span>
			)}
		</div>
	);
};

export default LoadingIndicator;
