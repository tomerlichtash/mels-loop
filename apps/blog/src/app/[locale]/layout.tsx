import { createLocaleLayout } from '@mels-loop/ui/layout';
import '../../content-init';

const { Layout, generateMetadata } = createLocaleLayout({
	navItems: [
		{ key: 'nav.home', href: '' },
		{ key: 'nav.blog', href: '/posts' },
		{ key: 'nav.glossary', href: 'https://melsloop.com/glossary' },
		{ key: 'nav.about', href: 'https://melsloop.com/about' },
		{ key: 'nav.contact', href: '/contact' },
	],
	footerLinks: [
		{
			titleKey: 'footer.pages',
			links: [
				{
					label: 'nav.about',
					href: 'https://melsloop.com/about',
					external: true,
					icon: 'info',
				},
				{ label: 'nav.blog', href: '/posts', icon: 'reader' },
				{
					label: 'nav.contribute',
					href: 'https://melsloop.com/contribute',
					external: true,
					icon: 'heart',
				},
			],
		},
		{
			titleKey: 'footer.links',
			links: [
				{
					label: 'menuItems.github',
					href: 'https://github.com/mels-loop',
					external: true,
					icon: 'github',
				},
				{
					label: 'menuItems.twitter',
					href: 'https://x.com/aboutmelsloop',
					external: true,
					icon: 'twitter',
				},
				{ label: 'nav.contact', href: '/contact', icon: 'envelope' },
			],
		},
	],
	titlePrefix: 'Blog',
});

export { generateMetadata };
export default Layout;
