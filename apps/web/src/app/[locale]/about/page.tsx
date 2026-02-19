import { StaticPage } from '@/components/StaticPage';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: PageProps) {
	const { locale } = await params;
	return <StaticPage locale={locale} slug="about" navKey="nav.about" />;
}
