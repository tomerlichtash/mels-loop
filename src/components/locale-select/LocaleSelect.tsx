import React from 'react';
import ToggleGroup from '../toggle-group/ToggleGroup';
import ToggleGroupItem from '../toggle-group-item/ToggleGroupItem';
import type { LocaleId } from 'locale/locale-context';
import { unique } from 'lib/utils';
import styles from './LocaleSelect.module.scss';

type LocaleOption = {
	id: LocaleId;
	label: string;
	title: string;
};

type LocaleSelectProps = {
	defaultValue: string;
	options: LocaleOption[];
	onSelect: (id: LocaleId) => void;
};

const LocaleSelect = ({
	defaultValue,
	options,
	onSelect,
}: LocaleSelectProps): JSX.Element => (
	<ToggleGroup
		type="single"
		defaultValue={defaultValue}
		onSelect={onSelect}
		className={styles.root}
	>
		{options.map(({ id, label, title }) => (
			<ToggleGroupItem
				title={title}
				value={id}
				data-locale={id}
				key={unique.id()}
			>
				{label}
			</ToggleGroupItem>
		))}
	</ToggleGroup>
);

export default LocaleSelect;

export type { LocaleOption, LocaleSelectProps };
