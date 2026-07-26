import type { Root as HastRoot } from 'hast';

export interface ContentMetadata {
	title?: string;
	subtitle?: string;
	abstract?: string;
	author?: string;
	date?: string;
	glossary_key?: string;
	source_url?: string;
	source_name?: string;
	source_author?: string;
	moto?: string;
	credits?: string;
	parse_mode?: 'verse' | 'normal';
	figures?: FigureConfig;
	sources?: string[];
	[key: string]: unknown;
}

export interface FigureConfig {
	auto?: boolean;
	template?: string;
	base_index?: number;
}

export interface ProcessedContent {
	metadata: ContentMetadata;
	hast: HastRoot;
	raw: string;
}
