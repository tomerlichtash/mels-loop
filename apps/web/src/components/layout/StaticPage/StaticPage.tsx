import type { ProcessedContent } from '@mels-loop/content-pipeline/types';
import {
	type BreadcrumbItem,
	Breadcrumbs,
	Container,
	Text,
} from '@mels-loop/ui/primitives';
import type { ReactNode } from 'react';

import { ContentRenderer } from '@/content';

import { BreadcrumbBar } from '../BreadcrumbBar/BreadcrumbBar';

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
		<>
			{/* In the bar under the header, where every trail on the site sits —
			    not in the content column. */}
			<BreadcrumbBar>
				<Breadcrumbs items={breadcrumbs} />
			</BreadcrumbBar>
			<Container>
				<Container gap="lg">
					<Text variant="h1">{title}</Text>
					{content && <ContentRenderer hast={content.hast} />}
					{children}
				</Container>
			</Container>
		</>
	);
}
