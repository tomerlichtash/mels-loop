// import { format, parseISO } from "date-fns";
// import { getLocale, getLocaleFormat } from "../../utils";
import { ComponentProps } from "../../interfaces/models";
import { style, classes } from "./date.st.css";

export interface DateProps extends ComponentProps{
	dateString: string;
}

export const Date = (props: DateProps): JSX.Element => {
	const { dateString, locale } = props;
	if (!dateString) {
		return null;
	}
	// const date = parseISO(dateString);
	return (
		<time dateTime={dateString} className={style(classes.root, { locale })}>
			timestamp
			{/* {format(date, getLocaleFormat(locale), {
				locale: getLocale(locale),
			})} */}
		</time>
	);
};

export default Date;
