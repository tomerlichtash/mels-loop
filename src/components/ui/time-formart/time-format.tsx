import React from "react";
import { ComponentProps } from "../../../interfaces/models";
import { format } from "./time-format-utils";
import { st, classes } from "./time-format.st.css";

export interface DateProps extends ComponentProps {
	timestamp: Date;
	locale: string;
}

export const TimeFormat = ({
	timestamp,
	locale,
	className,
}: DateProps): JSX.Element => {
	if (!timestamp) {
		return null;
	}

	const fDate = format(timestamp, locale);

	return (
		<time dateTime={fDate} className={st(classes.root, className)}>
			{fDate}
		</time>
	);
};

export default TimeFormat;
