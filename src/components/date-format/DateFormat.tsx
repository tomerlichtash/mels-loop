import { format as dateFormat } from 'date-fns';
import classNames from 'classnames';
import styles from './DateFormat.module.scss';

type DateFormatProps = {
	date: Date;
	format?: string;
	className?: string;
};

const DateFormat = ({
	date,
	format = 'MM/dd/yy',
	className,
}: DateFormatProps): JSX.Element => (
	<time className={classNames(styles.root, className)}>
		{dateFormat(date, format)}
	</time>
);

export default DateFormat;
export type { DateFormatProps };
