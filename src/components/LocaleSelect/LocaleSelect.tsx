import React from 'react';
import { Button, ToggleGroup } from '@melsloop/ml-components';
import styles from './LocaleSelect.module.css';
import classNames from 'classnames';
import { useLocale } from 'hooks/useLocale';

type LocaleSelectProps = {
	className?: string;
};

const LocaleSelect = ({ className }: LocaleSelectProps): JSX.Element => {
	const { lang, localeItems: options, setLocale } = useLocale();

	return (
		<ToggleGroup
			defaultValue={lang}
			onSelect={(id) => void setLocale(id)}
			className={classNames(styles.root, className)}
		>
			{options.map(({ id, label, title }) => (
				<Button
					title={title}
					data-value={id}
					data-locale={id}
					variant="outline"
					mode="primary"
					size="xs"
					className={styles.button}
					key={`locale-item-${id}`}
				>
					{label}
				</Button>
			))}
		</ToggleGroup>
	);
};

export default LocaleSelect;
