module.exports = {
	locales: ['en', 'he'],
	defaultLocale: 'en',
	direction: {
		en: 'ltr',
		he: 'rtl',
	},
	localesToIgnore: [],
	logBuild: false,
	pages: {
		'*': ['common', 'locale', 'nav', 'authors'],
		'/': ['glossary'],
		'/glossary': ['glossary'],
		'/docs': ['docs'],
		'/pages/docs/[id]/codex': ['docs'],
		'/posts': ['blog'],
		'/posts/[id]': ['blog'],
	},
	loadLocaleFrom: (lang, ns) =>
		// You can use a dynamic import, fetch, whatever. You should
		// return a Promise with the JSON file.
		import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
};
