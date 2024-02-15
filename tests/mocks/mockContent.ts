import { IPageMetaData } from 'types/models';

export default [
	{
		metaData: {
			glossary_key: '',
			date: null,
			title: 'About',
			abstract: "About Mel's Loop Project",
			moto: '',
			author: '',
			credits: '',
			source_url: '',
			source_name: '',
			source_author: '',
			parse_mode: '',
			figures: {
				auto: true,
				base: 1,
				template: '[[markdown:tags:figure:abbr]] %index%',
			},
		},
		id: 'index.en.md',
		chapterId: '',
		path: 'about/index.en.md',
		parsed: [],
		error: '',
	},
];

export const mockContentDataWithProps = ({
	id = 'index.en.md',
	chapterId = '',
	path = 'about/index.en.md',
	parsed = [],
	error = '',
	data,
}: {
	id?: string;
	chapterId?: string;
	path?: string;
	parsed?: string[];
	error?: string;
	data: IPageMetaData;
}) => [
	{
		metaData: {
			glossary_key: data.glossary_key || '',
			date: data.date || null,
			title: data.title || 'About',
			abstract: data.abstract || "About Mel's Loop Project",
			moto: data.moto || '',
			author: data.author || '',
			credits: data.credits || '',
			source_url: data.source_url || '',
			source_name: data.source_name || '',
			source_author: data.source_author || '',
			parse_mode: data.parse_mode || '',
			figures: data.figures || {
				auto: true,
				base: 1,
				template: '[[markdown:tags:figure:abbr]] %index%',
			},
		},
		id,
		chapterId,
		path,
		parsed,
		error,
	},
];
