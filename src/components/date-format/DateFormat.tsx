import dateFormat from 'dateformat';
import classNames from 'classnames';
import { localeFormats } from './consts';
import styles from './DateFormat.module.scss';
import type { LocaleId } from '../../locale/locale-context';

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

export { DateFormat };

export type { DateFormatProps };
