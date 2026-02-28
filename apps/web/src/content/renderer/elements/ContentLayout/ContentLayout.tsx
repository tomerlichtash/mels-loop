import type { ReactNode } from 'react';

import styles from './ContentLayout.module.css';

interface ContentLayoutProps {
	children?: ReactNode;
	'data-layout'?: string;
	'data-cols-ratio'?: string;
	[key: string]: unknown;
}

const RATIO_CLASSES: Record<string, string> = {
	'1-1': styles['cols-1-1'],
	'1-2': styles['cols-1-2'],
	'2-1': styles['cols-2-1'],
	'1-3': styles['cols-1-3'],
	'3-1': styles['cols-3-1'],
};

export function ContentLayout({ children, ...props }: ContentLayoutProps) {
	const layout = props['data-layout'] as string | undefined;
	const ratio = props['data-cols-ratio'] as string | undefined;
	delete props['data-layout'];
	delete props['data-cols-ratio'];

	if (!layout) {
		return <div {...props}>{children}</div>;
	}

	const className =
		layout === 'cols'
			? `${styles.cols}${ratio && RATIO_CLASSES[ratio] ? ` ${RATIO_CLASSES[ratio]}` : ''}`
			: undefined;

	return (
		<div className={className} {...props}>
			{children}
		</div>
	);
}
