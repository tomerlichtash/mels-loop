import type { SourceType } from '@mels-loop/content-loaders/types';
import {
	ArchiveIcon,
	ArticleIcon,
	FileIcon,
	FilePdfIcon,
	FileTextIcon,
	ImageIcon,
	LinkIcon,
	SpeakerHighIcon,
	VideoCameraIcon,
} from '@phosphor-icons/react/ssr';
import type { ComponentType } from 'react';

export const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
	document: 'Document',
	image: 'Image',
	pdf: 'PDF',
	audio: 'Audio',
	video: 'Video',
	link: 'Link',
	text: 'Text',
	archive: 'Archive',
	other: 'Other',
};

/**
 * What kind of record this is, at a glance.
 *
 * A short list of sources is a list of very different things — a scanned
 * manifest, a Usenet post, a program writeup — and the titles alone do not say
 * which is which until you have read them. The glyph does that work before the
 * reader gets to the words.
 */
export const SOURCE_TYPE_ICONS: Record<
	SourceType,
	ComponentType<{ className?: string; weight?: 'regular' | 'bold' }>
> = {
	document: FileTextIcon,
	image: ImageIcon,
	pdf: FilePdfIcon,
	audio: SpeakerHighIcon,
	video: VideoCameraIcon,
	link: LinkIcon,
	text: ArticleIcon,
	archive: ArchiveIcon,
	other: FileIcon,
};
