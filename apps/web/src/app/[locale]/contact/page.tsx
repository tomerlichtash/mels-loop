import { StaticPage } from '@/components/StaticPage';
import { ContactPage } from '@mels-loop/forms/ContactPage';

interface PageProps {
	params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
	const { locale } = await params;
	return (
		<StaticPage locale={locale} navKey="nav.contact" size="sm">
			<ContactPage locale={locale} />
		</StaticPage>
	);
}
