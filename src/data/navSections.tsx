import { Site, CodexItems } from './navItems';
import type { NavSectionsData } from './types';

export const TopBarMenuItemsData: NavSectionsData = {
	articles: {
		title: 'nav:sections:articles:label',
		items: [
			CodexItems.storyOfMel.articles.preface,
			CodexItems.storyOfMel.articles.biography,
			CodexItems.storyOfMel.articles.missingBits,
			CodexItems.storyOfMel.articles.resources
		]
	},
	about: {
		title: 'nav:items:pages:about:label',
		items: []
	},
	contact: {
		title: 'nav:items:pages:contact:label',
		items: [Site.pages.contact, Site.links.twitter, Site.links.github]
	}
};

export const FooterLinksItemsData: NavSectionsData = {
	pages: {
		title: 'Pages',
		items: [Site.pages.about, Site.pages.blog, Site.pages.contribute]
	},
	links: {
		title: 'Links',
		items: [Site.pages.contact, Site.links.twitter, Site.links.github]
	}
};
