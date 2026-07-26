/**
 * The timezone the content's dates were written in.
 *
 * Frontmatter carries values like `Tue May 21 2023 01:00:00 GMT+0300` — an
 * instant, not a calendar date. Read in UTC, that instant falls on May 20, so
 * a server running in UTC rendered every early-morning date a day early.
 * Formatting in the zone the dates were authored in gives back the day that
 * was written down.
 */
const AUTHORING_TIME_ZONE = 'Asia/Jerusalem';

/**
 * An article's date, in the order the reader's language writes one:
 * month first in English, day first in Hebrew.
 *
 * Both use slashes. Intl would give Hebrew dots — correct for he-IL, but the
 * two locales should differ in order here, not in punctuation, or the same
 * date looks like two different kinds of value across the language switch.
 */
export function formatArticleDate(value: string, locale: string): string {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return '';

	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone: AUTHORING_TIME_ZONE,
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	}).formatToParts(date);

	const get = (type: Intl.DateTimeFormatPartTypes) =>
		parts.find((part) => part.type === type)?.value ?? '';

	const day = get('day');
	const month = get('month');
	const year = get('year');

	return locale === 'he'
		? `${day}/${month}/${year}`
		: `${month}/${day}/${year}`;
}
