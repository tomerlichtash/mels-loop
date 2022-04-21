import React from "react";
import { ComponentProps } from "../../../interfaces/models";
// import { format } from "date-fns";
import { st, classes } from "./time-format.st.css";

export interface DateProps extends ComponentProps {
	dateStr: Date;
	locale: string;
}

// const localeFormats = {
// 	en: "MM-dd-yyyy",
// 	he: "dd/MM/yyyy",
// };

// const getLocaleFormat = (locale: string): string => localeFormats[locale];

export const TimeFormat = ({ dateStr, locale }: DateProps): JSX.Element => {
	if (!dateStr) {
		return null;
	}

	const date = new Date(dateStr);

	return (
		<time dateTime={date.toString()} className={st(classes.root)}>
			{/* {format(date, getLocaleFormat(locale))} */}
		</time>
	);
};

export default TimeFormat;
