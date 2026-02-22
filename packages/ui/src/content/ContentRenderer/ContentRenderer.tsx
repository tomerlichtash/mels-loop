'use client';

import { useMemo } from 'react';
import cn from 'classnames';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import type { Root as HastRoot, ElementContent } from 'hast';
import {
	Heading,
	Paragraph,
	Blockquote,
	List,
	ListItem,
	Code,
	HorizontalDivider,
	Figure,
	CodeBlock,
	Table,
	Image,
	Line,
} from '../components';
import { AnnotationAwareLink } from '../annotations/AnnotationAwareLink/AnnotationAwareLink';
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
		h1: (props) => <Heading level={1} {...props} />,
		h2: (props) => <Heading level={2} {...props} />,
		h3: (props) => <Heading level={3} {...props} />,
		h4: (props) => <Heading level={4} {...props} />,
		h5: (props) => <Heading level={5} {...props} />,
		h6: (props) => <Heading level={6} {...props} />,
		p: Paragraph,
		blockquote: Blockquote,
		ul: (props) => <List {...props} />,
		ol: (props) => <List ordered {...props} />,
		li: ListItem,
		a: AnnotationAwareLink,
		code: Code,
		hr: HorizontalDivider,
		figure: Figure,
		pre: CodeBlock,
		table: Table,
		img: Image,
		line: Line,
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
