import type { Meta, StoryObj } from '@storybook/react';
import { LocaleSelect } from 'components/locale-select';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const meta = {
	title: 'Site/LocaleSelect',
	component: LocaleSelect,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof LocaleSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const Desktop: Story = {
	args: {
		defaultValue: 'en',
		options: [
			{
				id: 'en',
				label: 'EN',
				title: 'English',
			},
			{
				id: 'he',
				label: 'ע',
				title: 'עברית',
			},
		],
		onSelect: (id: string) => {
			console.log('toggle from story', id);
		},
	},
	render: function Render({ defaultValue, options, onSelect }) {
		return (
			<LocaleSelect
				defaultValue={defaultValue}
				options={options}
				onSelect={onSelect}
			/>
		);
	},
};

export const Mobile: Story = {
	...Desktop,
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
		},
	},
};
