import React from 'react';
import { useLocale } from 'hooks/useLocale';
import { Button, Icon } from '@melsloop/ml-components';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import styles from './PopoverBackButton.module.css';

type PopoverBackButtonProps = {
	title: string;
	onClick: () => void;
	className?: string;
};
const PopoverBackButton = ({
	title,
	onClick,
	className
}: PopoverBackButtonProps): JSX.Element => {
	const { t } = useLocale();
	return (
		<Button
			asChild
			variant="contained"
			mode="primary"
			size="xs"
			title={t(title)}
			onClick={onClick}
			className={classNames(styles.root, className)}
		>
			<Icon>
				<ChevronLeftIcon />
			</Icon>
		</Button>
	);
};

export default PopoverBackButton;
