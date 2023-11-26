import dateFormat from "dateformat";
import classNames from "classnames";
import styles from "./DateFormat.module.scss";

import type { ComponentProps } from "../../../interfaces/models";
import type { LocaleId } from "../../../locale/locale-context";

export interface DateFormatProps extends ComponentProps {
	date?: Date;
	locale?: LocaleId;
}

const localeMasks = {
	en: "mm/d/yy",
	he: "d/mm/yy",
	default: "mm/d/yy",
};

const DateFormat = ({
	date,
	locale,
	className,
}: DateFormatProps): JSX.Element => {
	return (
		<time className={classNames(styles.root, className)}>
			{dateFormat(date, localeMasks[locale ? locale : "default"])}
		</time>
	);
};

export default DateFormat;
