import cn from 'classnames';

import styles from './HorizontalDivider.module.css';

interface HorizontalDividerProps {
	className?: string;
	[key: string]: unknown;
}

export default function HorizontalDivider({
	className,
	...props
}: HorizontalDividerProps) {
	return <hr className={cn(styles.root, className)} {...props} />;
}
