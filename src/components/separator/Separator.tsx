import React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import styles from './Separator.module.scss';
import type { SeparatorProps } from './types';

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
