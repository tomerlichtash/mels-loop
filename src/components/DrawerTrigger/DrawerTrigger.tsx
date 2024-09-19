import React from 'react';
import { Button } from '@melsloop/ml-components';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import styles from './DrawerTrigger.module.css';

type DrawerTriggerProps = {
	onClick: (val: boolean) => void;
	className?: string;
};

const DrawerTrigger = ({ onClick, className }: DrawerTriggerProps) => (
	<span className={classNames(styles.root, className)}>
		<Button
			variant="contained"
			mode="primary"
			size="xs"
			// onClick={onClick}
		>
			<HamburgerMenuIcon color="black" />
		</Button>
	</span>
);

export default DrawerTrigger;
