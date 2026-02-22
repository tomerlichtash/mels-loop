import type { ReactNode } from 'react';

import styles from './Figure.module.css';

interface FigureProps {
	children?: ReactNode;
	'data-figure-index'?: string;
	[key: string]: unknown;
}

const CSS_PROP_MAP: Record<string, keyof React.CSSProperties> = {
	'data-width': 'width',
	'data-max-width': 'maxWidth',
	'data-height': 'height',
	'data-max-height': 'maxHeight',
};

function toUnit(v: unknown): string | undefined {
	if (v === undefined || v === null) return undefined;
	const s = String(v);
	return /^\d+(\.\d+)?$/.test(s) ? `${s}px` : s;
}

export default function Figure({ children, ...props }: FigureProps) {
	const sizeStyle: React.CSSProperties = {};
	for (const [attr, cssProp] of Object.entries(CSS_PROP_MAP)) {
		const unit = toUnit(props[attr]);
		if (unit) (sizeStyle as Record<string, string>)[cssProp as string] = unit;
		delete props[attr];
	}
	return (
		<figure
			className={styles.root}
			style={Object.keys(sizeStyle).length ? sizeStyle : undefined}
			{...props}
		>
			{children}
		</figure>
	);
}
