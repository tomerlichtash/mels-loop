import React from 'react';
import { useLocale } from 'hooks/useLocale';
import { Button, Icon, PopoverClose } from '@melsloop/ml-components';
import { Cross1Icon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import styles from './PopoverCloseButton.module.css';

type PopoverCloseButtonProps = {
	className?: string;
};

const PopoverCloseButton = ({ className }: PopoverCloseButtonProps): JSX.Element => {
	const { t } = useLocale();
	return (
		<PopoverClose
			className={classNames(styles.root, className)}
			asChild
		>
			<Button
				asChild
				variant="contained"
				mode="primary"
				size="xs"
				title={t('common:button:close')}
			>
				<span>
					<Icon>
						<Cross1Icon />
					</Icon>
				</span>
			</Button>
		</PopoverClose>
	);
};

export default PopoverCloseButton;
