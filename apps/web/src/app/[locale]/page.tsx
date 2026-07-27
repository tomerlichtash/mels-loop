import { redirect } from 'next/navigation';

/**
 * The archive holds one story, so it is the front page.
 *
 * A homepage introducing an archive of one is a lobby with a single door. The
 * hero, the featured card and the archive grid that used to live here are on
 * the `rewrite` branch and come back — as their own PR — when there is a
 * second story to introduce.
 *
 * Redirecting from the page rather than from next.config.ts keeps the rule in
 * one place and covers the locale-prefixed form too: `/en` resolves here just
 * as `/` does.
 */
export default function HomePage() {
	redirect('/stories/the-story-of-mel');
}
