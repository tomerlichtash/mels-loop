import React, { PropsWithChildren } from 'react';
import { default as ModernDrawer } from 'react-modern-drawer';
import classNames from 'classnames';
import styles from './Drawer.module.scss';
import type { DrawerProps } from './types';

const Drawer = ({
	open,
	direction = 'right',
	size = 350,
	duration = 300,
	overlayOpacity = 0.5,
	onClose,
	children,
	className,
}: PropsWithChildren<DrawerProps>) => (
	<ModernDrawer
		direction={direction}
		open={open}
		size={size}
		duration={duration}
		overlayOpacity={overlayOpacity}
		onClose={onClose}
		className={classNames(styles.root, className)}
	>
		{children}
	</ModernDrawer>
);

export default Drawer;

export type { DrawerProps };
