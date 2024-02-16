import React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import styles from './Separator.module.scss';

type SeparatorProps = {
	orientation?: 'vertical' | 'horizontal';
	decorative?: boolean;
	asChild?: boolean;
};

const Separator = ({
	orientation = 'vertical',
	decorative = true,
	asChild,
}: SeparatorProps): JSX.Element => (
	<SeparatorPrimitive.Root
		asChild={asChild}
		decorative={decorative}
		orientation={orientation}
		className={styles.root}
	/>
);

export default Separator;
export type { Separator };
