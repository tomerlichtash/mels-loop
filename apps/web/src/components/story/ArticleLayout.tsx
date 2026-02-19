import { Container, Title, Text, Stack } from '@mels-loop/ui/primitives';
import { Breadcrumb } from '@mels-loop/ui/shell';
import type { BreadcrumbItem } from '@mels-loop/ui/shell';
import type { ProcessedContent } from '@mels-loop/content-pipeline/types';
import {
	ContentRenderer,
	AnnotationProvider,
	AnnotationAwareLink,
} from '@mels-loop/ui/content';
import styles from './ArticleLayout.module.css';

interface ArticleLayoutProps {
	content: ProcessedContent;
	annotations?: Record<string, ProcessedContent>;
	glossary?: Record<string, ProcessedContent>;
	breadcrumbs?: BreadcrumbItem[];
	children?: React.ReactNode;
}

export function ArticleLayout({
	content,
	annotations = {},
	glossary = {},
	breadcrumbs,
	children,
}: ArticleLayoutProps) {
	const { metadata, hast } = content;

	return (
		<Container size="md">
			<Stack gap="lg">
				{breadcrumbs && <Breadcrumb items={breadcrumbs} />}
				{metadata.title && <Title order={1}>{metadata.title}</Title>}
				{metadata.abstract && (
					<Text size="lg" color="dimmed" italic>
						{metadata.abstract}
					</Text>
				)}
				{metadata.moto && (
					<Text size="sm" color="dimmed" italic>
						{metadata.moto}
					</Text>
				)}
				{metadata.credits && (
					<Text size="xs" color="dimmed">
						{metadata.credits}
					</Text>
				)}
				{metadata.author && (
					<Text size="sm" color="dimmed" uppercase>
						{metadata.author}
					</Text>
				)}
				<div className={styles.articleBody}>
					<AnnotationProvider annotations={annotations} glossary={glossary}>
						<ContentRenderer
							hast={hast}
							components={{ a: AnnotationAwareLink }}
						/>
					</AnnotationProvider>
				</div>
				{children}
			</Stack>
		</Container>
	);
}
