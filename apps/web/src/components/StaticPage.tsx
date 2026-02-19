import type { ReactNode } from 'react';
import { Container, Title, Stack } from '@mels-loop/ui/primitives';
import { Breadcrumb } from '@mels-loop/ui/shell';
import type { Locale } from '@mels-loop/i18n/config';
import { getPage } from '@mels-loop/content-pipeline/loaders';
import { getDictionary } from '@mels-loop/i18n/server';
import { ContentRenderer } from '@mels-loop/ui/content';
import { homeItem, dictGet } from '@/lib/breadcrumbs';

interface StaticPageProps {
	locale: string;
	/** i18n key for the nav label, e.g. "nav.about" */
	navKey: string;
	/** Content slug passed to getPage(). Omit when passing children instead. */
	slug?: string;
	/** Custom content to render instead of markdown */
	children?: ReactNode;
	size?: 'sm' | 'md' | 'lg';
}

export async function StaticPage({
	locale,
	navKey,
	slug,
	children,
	size = 'md',
}: StaticPageProps) {
	const content = slug ? await getPage(slug, locale as Locale) : null;
	const dict = await getDictionary(locale as Locale);

	const title = dictGet(dict as Record<string, unknown>, navKey);
	const displayTitle = content?.metadata.title || title;

	return (
		<Container size={size}>
			<Stack gap="lg">
				<Breadcrumb
					items={[
						homeItem(
							locale,
							dictGet(dict as Record<string, unknown>, 'nav.home'),
						),
						{ label: displayTitle },
					]}
				/>
				<Title order={1}>{displayTitle}</Title>
				{content && <ContentRenderer hast={content.hast} />}
				{children}
			</Stack>
		</Container>
	);
}
