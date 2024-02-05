import dateFormat from 'dateformat';
import classNames from 'classnames';
import { localeFormats } from './consts';
import styles from './DateFormat.module.scss';
import type { DateFormatProps } from './types';

const DateFormat = ({
	date,
	locale,
	format = 'mm/d/yy',
	className,
}: DateFormatProps): JSX.Element => (
	<time className={classNames(styles.root, className)}>
		{dateFormat(date, localeFormats[locale] || format)}
	</time>
);

export default DateFormat;

export type { DateFormatProps };
