import cn from 'classnames';
import type { HTMLAttributes } from 'react';

import styles from './Separator.module.css';

type SeparatorOrientation = 'horizontal' | 'vertical';

interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {
	orientation?: SeparatorOrientation;
}

export function Separator({
	orientation = 'horizontal',
	className,
	...props
}: SeparatorProps) {
	return (
		<hr
			className={cn(
				styles.root,
				styles[`orientation-${orientation}`],
				'ml-separator',
				className,
			)}
			{...props}
		/>
	);
}
