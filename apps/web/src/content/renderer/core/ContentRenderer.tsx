'use client';

import {
	Blockquote,
	Code,
	CodeBlock,
	FigureCaption,
	List,
	ListItem,
	Separator,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	Text,
} from '@mels-loop/ui/primitives';
import cn from 'classnames';
import type { ElementContent, Root as HastRoot } from 'hast';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { useMemo } from 'react';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

import { AnnotationAwareLink } from '../elements/AnnotationAwareLink/AnnotationAwareLink';
import { ContentLayout } from '../elements/ContentLayout/ContentLayout';
import { FigureDialog } from '../elements/FigureDialog/FigureDialog';
import { Image } from '../elements/Image/Image';
import { Line } from '../elements/Line/Line';
import styles from './ContentRenderer.module.css';

type ComponentOverrides = Record<
	string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	React.ComponentType<any>
>;

interface ContentRendererProps {
	hast: HastRoot;
	components?: ComponentOverrides;
	className?: string;
}

function defaultComponents(): ComponentOverrides {
	return {
		h1: (props) => <Text variant="h1" {...props} />,
		h2: (props) => <Text variant="h2" {...props} />,
		h3: (props) => <Text variant="h3" {...props} />,
		h4: (props) => <Text variant="h4" {...props} />,
		h5: (props) => <Text variant="subtitle1" component="h5" {...props} />,
		h6: (props) => <Text variant="subtitle2" component="h6" {...props} />,
		// body1 (1rem), not body2 (0.875rem): this is long-form reading text, and
		// at 14px the story column ran ~94 characters per line.
		p: (props) => <Text variant="body1" {...props} />,
		blockquote: Blockquote,
		ul: (props) => <List {...props} />,
		ol: (props) => <List ordered {...props} />,
		li: ListItem,
		a: AnnotationAwareLink,
		code: Code,
		hr: Separator,
		figure: FigureDialog,
		figcaption: FigureCaption,
		pre: CodeBlock,
		table: Table,
		thead: TableHead,
		tbody: TableBody,
		tr: TableRow,
		th: TableHeaderCell,
		td: TableCell,
		img: Image,
		line: Line,
		div: ContentLayout,
	};
}

export function ContentRenderer({
	hast,
	components: extraComponents,
	className,
}: ContentRendererProps) {
	const components = useMemo(
		() => ({ ...defaultComponents(), ...extraComponents }),
		[extraComponents],
	);

	const content = useMemo(() => {
		try {
			return toJsxRuntime(hast as unknown as ElementContent | HastRoot, {
				Fragment,
				jsx,
				jsxs,
				components,
				ignoreInvalidStyle: true,
			});
		} catch (error) {
			console.error('ContentRenderer error:', error);
			return null;
		}
	}, [hast, components]);

	return <div className={cn(styles.root, className)}>{content}</div>;
}
