import { Container, Title, Stack } from '@mels-loop/ui/primitives';
import { Breadcrumb } from '@mels-loop/ui/shell';
import type { Locale } from '@mels-loop/i18n/config';
import { getDictionary } from '@mels-loop/i18n/server';
import { getAllGlossarySlugs } from '@mels-loop/content-pipeline/loaders';
import { GlossaryList } from '@/components/glossary/GlossaryList';
import { homeItem, dictGet } from '@/lib/breadcrumbs';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function GlossaryIndexPage({ params }: PageProps) {
	const { locale } = await params;
	const dict = await getDictionary(locale as Locale);
	const slugs = await getAllGlossarySlugs();

	const title = dictGet(dict as Record<string, unknown>, 'nav.glossary');

	return (
		<Container size="md">
			<Stack gap="lg">
				<Breadcrumb
					items={[
						homeItem(
							locale,
							dictGet(dict as Record<string, unknown>, 'nav.home'),
						),
						{ label: title },
					]}
				/>
				<Title order={1}>{title}</Title>
				<GlossaryList slugs={slugs} locale={locale} />
			</Stack>
		</Container>
	);
}
