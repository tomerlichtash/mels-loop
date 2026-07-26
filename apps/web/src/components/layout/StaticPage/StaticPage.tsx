import type { ProcessedContent } from '@mels-loop/content-pipeline/types';
import {
	type BreadcrumbItem,
	Breadcrumbs,
	Container,
	Text,
} from '@mels-loop/ui/primitives';
import type { ReactNode } from 'react';

import { ContentRenderer } from '@/content';

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
