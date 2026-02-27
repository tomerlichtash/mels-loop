import type { SourceType } from '@mels-loop/content-pipeline/types';

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

export const SOURCE_TYPE_COLORS: Partial<Record<SourceType, string>> = {
	image: 'color-mix(in srgb, var(--ml-accent) 15%, transparent)',
	pdf: 'color-mix(in srgb, #e74c3c 15%, transparent)',
	audio: 'color-mix(in srgb, #9b59b6 15%, transparent)',
	video: 'color-mix(in srgb, #3498db 15%, transparent)',
	link: 'color-mix(in srgb, #27ae60 15%, transparent)',
};
