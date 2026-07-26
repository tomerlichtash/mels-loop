import type { SourceType } from '@mels-loop/content-loaders/types';

export const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
	image: 'Image',
	pdf: 'PDF',
	audio: 'Audio',
	video: 'Video',
	link: 'Link',
	text: 'Text',
	archive: 'Archive',
	other: 'Other',
};
