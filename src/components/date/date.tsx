import { ComponentProps } from "../../interfaces/models";
import { style, classes } from "./date.st.css";

export interface DateProps extends ComponentProps {
	dateString: string;
	locale: string;
}

export const Date = (props: DateProps): JSX.Element => {
	const { dateString, locale } = props;
	if (!dateString) {
		return null;
	}
	return (
		<time dateTime={dateString} className={style(classes.root, { locale })}>
			timestamp
		</time>
	);
};

export default Date;
