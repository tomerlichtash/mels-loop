import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface StoryEntry {
	id: string;
	type: string;
	title: string;
	name: string;
}

interface StorybookIndex {
	entries: Record<string, StoryEntry>;
}

let _allStories: StoryEntry[] | null = null;

function loadAllStories(): StoryEntry[] {
	if (_allStories) return _allStories;
	const indexPath = resolve(__dirname, '../storybook-static/index.json');
	const raw = readFileSync(indexPath, 'utf-8');
	const index: StorybookIndex = JSON.parse(raw);
	_allStories = Object.values(index.entries).filter(
		(entry) => entry.type === 'story',
	);
	return _allStories;
}

export function getStoriesByTitle(title: string): StoryEntry[] {
	return loadAllStories().filter((s) => s.title === title);
}

export const stories = loadAllStories();
