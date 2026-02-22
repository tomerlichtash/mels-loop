import type { ProcessedContent } from '@mels-loop/content-pipeline/types';
import { ContentRenderer } from '@mels-loop/ui/content';
import { type BreadcrumbItem, Breadcrumbs } from '@mels-loop/ui/layout';
import { Container, Heading, Stack } from '@mels-loop/ui/primitives';
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
			<Stack gap="lg">
				<Breadcrumbs items={breadcrumbs} />
				<Heading order={1}>{title}</Heading>
				{content && <ContentRenderer hast={content.hast} />}
				{children}
			</Stack>
		</Container>
	);
}
