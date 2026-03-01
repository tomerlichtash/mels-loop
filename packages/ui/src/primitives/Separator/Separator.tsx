import * as RadixSeparator from '@radix-ui/react-separator';
import cn from 'classnames';

import styles from './Separator.module.css';

interface SeparatorProps {
	orientation?: 'horizontal' | 'vertical';
	decorative?: boolean;
	className?: string;
}

export function Separator({
	orientation = 'horizontal',
	decorative = true,
	className,
}: SeparatorProps) {
	return (
		<RadixSeparator.Root
			orientation={orientation}
			decorative={decorative}
			className={cn(
				styles.root,
				styles[`orientation-${orientation}`],
				'ml-separator',
				className,
			)}
		/>
	);
}
