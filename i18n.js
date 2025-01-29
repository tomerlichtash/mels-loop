module.exports = {
	locales: ['en', 'he'],
	defaultLocale: 'en',
	direction: {
		en: 'ltr',
		he: 'rtl',
	},
	logBuild: false,
	pages: {
		'*': ['common', 'locale', 'nav', 'pages', 'authors'],
		'/': ['glossary'],
		'/contact': ['contact'],
		'/glossary': ['glossary'],
		'/glossary/[id]': ['glossary'],
		'/pages/docs/[id]/codex': ['docs'],
		'he/posts': ['blog'],
		'/posts/[id]': ['blog'],
	},
	loadLocaleFrom: async (lang, ns) => {
		// You can use a dynamic import, fetch, whatever. You should
		// return a Promise with the JSON file.
		const m = await import(`./locales/${lang}/${ns}.json`);
		return  m.default
	},
};
