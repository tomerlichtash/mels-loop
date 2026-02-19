import { StaticPage } from '@/components/StaticPage';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function ContributePage({ params }: PageProps) {
	const { locale } = await params;
	return (
		<StaticPage locale={locale} slug="contribute" navKey="nav.contribute" />
	);
}
