import { dictGet } from '@mels-loop/i18n/dict';
import type { BreadcrumbItem } from '@mels-loop/ui/primitives';

export function homeItem(homeLabel: string): BreadcrumbItem {
	return { label: homeLabel, href: '/' };
}

/** Shorthand: builds the home breadcrumb directly from a page dictionary. */
export function homeItemFromDict(dict: unknown): BreadcrumbItem {
	return homeItem(dictGet(dict, 'nav.home'));
}
