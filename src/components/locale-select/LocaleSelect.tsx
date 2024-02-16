import React from 'react';
import ToggleGroup from '../toggle-group/ToggleGroup';
import ToggleGroupItem from '../toggle-group-item/ToggleGroupItem';
import { unique } from 'utils/index';
import styles from './LocaleSelect.module.scss';
import type { LocaleId } from 'types/locale';

type LocaleOptionProps = {
	id: LocaleId;
	label: string;
	title: string;
};

type LocaleSelectProps = {
	defaultValue: string;
	options: LocaleOptionProps[];
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
export type { LocaleOptionProps, LocaleSelectProps };
