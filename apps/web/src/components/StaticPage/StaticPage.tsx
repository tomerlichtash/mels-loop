import type { ProcessedContent } from '@mels-loop/content-pipeline/types';
import { ContentRenderer } from '@mels-loop/content-ui';
import {
	type BreadcrumbItem,
	Breadcrumbs,
	Container,
	Text,
} from '@mels-loop/ui/primitives';
import type { ReactNode } from 'react';

interface StaticPageProps {
	title: string;
	breadcrumbs: BreadcrumbItem[];
	content?: ProcessedContent | null;
	children?: ReactNode;
}

export function StaticPage({
	title,
	breadcrumbs,
	content,
	children,
}: StaticPageProps) {
	return (
		<Container>
			<Container gap="lg">
				<Breadcrumbs items={breadcrumbs} />
				<Text variant="h1">{title}</Text>
				{content && <ContentRenderer hast={content.hast} />}
				{children}
			</Container>
		</Container>
	);
}
