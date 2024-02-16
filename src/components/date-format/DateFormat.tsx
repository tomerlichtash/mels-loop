import { format as dateFormat } from 'date-fns';
import { localeFormats } from './consts';
import classNames from 'classnames';
import styles from './DateFormat.module.scss';
import type { LocaleId } from 'types/locale';

type DateFormatProps = {
	date: Date;
	locale?: LocaleId;
	format?: string;
	className?: string;
};

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
