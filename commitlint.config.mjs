export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		/*
		 * The conventional set plus `content:`, which this archive needs as much
		 * as it needs `feat:` — a story, a source record or a translation is a
		 * release-worthy change that is not a code change, and release-please
		 * gives it its own changelog section.
		 *
		 * The list is closed on purpose. An open enum means a typo like
		 * `typograhy:` is accepted and then lands in no changelog section at
		 * all, which is the failure mode that makes generated notes untrustworthy.
		 */
		'type-enum': [
			2,
			'always',
			[
				'feat',
				'fix',
				'content',
				'perf',
				'refactor',
				'style',
				'docs',
				'build',
				'ci',
				'test',
				'chore',
				'revert',
			],
		],
	},
};
