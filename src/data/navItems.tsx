import { FileIcon, GitHubLogoIcon, Pencil1Icon, TwitterLogoIcon } from '@radix-ui/react-icons';
import type { NavItemProps } from './types';

type ItemCollection = Record<string, Record<string, NavItemProps>>;

export const Site: ItemCollection = {
	pages: {
		about: {
			id: 'about',
			title: 'nav:items:pages:about:label',
			subtitle: 'nav:items:pages:about:desc',
			url: '/about',
			icon: <Pencil1Icon />
		},
		contact: {
			id: 'contact',
			title: 'nav:items:pages:contact:label',
			subtitle: 'nav:items:pages:contact:desc',
			url: '/contact',
			icon: <Pencil1Icon />
		},
		blog: {
			id: 'blog',
			title: 'nav:items:pages:blog:label',
			subtitle: 'nav:items:pages:blog:desc',
			url: '/about',
			icon: <Pencil1Icon />
		},
		contribute: {
			id: 'contrib',
			title: 'nav:items:pages:blog:label',
			subtitle: 'nav:items:pages:blog:desc',
			url: '/about',
			icon: <Pencil1Icon />
		}
	},
	links: {
		twitter: {
			id: 'twitter',
			title: 'nav:items:links:twitter:label',
			subtitle: 'nav:items:links:twitter:desc',
			url: 'https://x.com/aboutmelsloop',
			targetBlank: true,
			icon: <TwitterLogoIcon />
		},
		github: {
			id: 'github',
			title: 'nav:items:links:github:label',
			subtitle: 'nav:items:links:github:desc',
			url: 'https://github.com/tomerlichtash/mels-loop',
			targetBlank: true,
			icon: <GitHubLogoIcon />
		}
	}
};

export const storyOfMel: ItemCollection = {
	articles: {
		preface: {
			id: 'preface',
			title: 'nav:items:articles:som:intro:label',
			subtitle: 'authors:tomerlichtash',
			url: '/docs/the-story-of-mel/pages/preface',
			icon: <FileIcon />
		},
		biography: {
			id: 'biography',
			title: 'nav:items:articles:som:bio:label',
			subtitle: 'authors:tomerlichtash',
			url: '/docs/the-story-of-mel/pages/mel-kaye-cv',
			icon: <FileIcon />
		},
		missingBits: {
			id: 'missing-bits',
			title: 'nav:items:articles:som:missingBits:label',
			subtitle: 'authors:dfl',
			url: '/docs/the-story-of-mel/pages/mels-hack-the-missing-bits',
			icon: <FileIcon />
		},
		resources: {
			id: 'resources',
			title: 'nav:items:pages:resources:label',
			subtitle: 'nav:items:pages:resources:desc',
			url: '/docs/the-story-of-mel/pages/mels-hack-the-missing-bits',
			icon: <FileIcon />
		}
	}
};

export const CodexItems = {
	storyOfMel
};
