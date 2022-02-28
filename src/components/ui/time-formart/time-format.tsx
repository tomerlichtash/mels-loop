import { ComponentProps } from "../../../interfaces/models";
import { format } from "date-fns";
import { style, classes } from "./time-format.st.css";

export interface DateProps extends ComponentProps {
	dateStr: Date;
	locale: string;
}

const localeFormats = {
	en: "MM-dd-yyyy hh:mm",
	he: "dd/MM/yyyy hh:mm",
};

const getLocaleFormat = (locale: string): string => localeFormats[locale];

export const TimeFormat = (props: DateProps): JSX.Element => {
	const { dateStr, locale } = props;

	if (!dateStr) {
		return null;
	}

	const date = new Date(dateStr);

	return (
		<time dateTime={date.toString()} className={style(classes.root)}>
			{format(date, getLocaleFormat(locale))}
		</time>
	);
};

export default TimeFormat;
