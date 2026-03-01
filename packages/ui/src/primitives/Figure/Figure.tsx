import cn from 'classnames';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

import styles from './Figure.module.css';

interface FigureProps extends HTMLAttributes<HTMLElement> {
	children?: ReactNode;
}

const CSS_PROP_MAP: Record<string, keyof CSSProperties> = {
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

export function Figure({ children, className, style, ...props }: FigureProps) {
	const sizeStyle: CSSProperties = {};
	for (const [attr, cssProp] of Object.entries(CSS_PROP_MAP)) {
		const unit = toUnit(props[attr as keyof typeof props]);
		if (unit) (sizeStyle as Record<string, string>)[cssProp as string] = unit;
		delete (props as Record<string, unknown>)[attr];
	}

	const mergedStyle = Object.keys(sizeStyle).length
		? { ...sizeStyle, ...style }
		: style;

	return (
		<figure
			className={cn(styles.root, className)}
			style={mergedStyle}
			{...props}
		>
			{children}
		</figure>
	);
}
