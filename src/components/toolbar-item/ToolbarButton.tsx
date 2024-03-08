import React, { PropsWithChildren } from 'react';
import Button from '../button/Button';
import PopoverToolbarItem from './ToolbarItem';
import styles from './ToolbarButton.module.scss';

type ToolbarButtonProps = {
	title: string;
	onClick: () => void;
	className?: string;
};

const ToolbarButton = ({
	title,
	onClick,
	children,
}: PropsWithChildren<ToolbarButtonProps>): JSX.Element => (
	<PopoverToolbarItem>
		<Button
			title={title}
			onClick={onClick}
			className={styles.root}
		>
			{children}
		</Button>
	</PopoverToolbarItem>
);

export default ToolbarButton;
