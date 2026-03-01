import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Text.module.css';

type TextVariant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'subtitle1'
	| 'subtitle2'
	| 'body1'
	| 'body2'
	| 'caption'
	| 'label';
type TextColor =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'error'
	| 'warning'
	| 'info'
	| 'muted';
type TextWeight = 400 | 500 | 600 | 700;
type TextAlign = 'start' | 'center' | 'end';
type TextElement =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'p'
	| 'span'
	| 'div'
	| 'label'
	| 'em'
	| 'strong';

const VARIANT_ELEMENTS: Record<TextVariant, string> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	subtitle1: 'p',
	subtitle2: 'p',
	body1: 'p',
	body2: 'p',
	caption: 'span',
	label: 'label',
};

interface TextProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
	children: ReactNode;
	variant?: TextVariant;
	color?: TextColor;
	weight?: TextWeight;
	align?: TextAlign;
	italic?: boolean;
	uppercase?: boolean;
	capitalize?: boolean;
	truncate?: boolean;
	lineClamp?: number;
	fullWidth?: boolean;
	component?: TextElement;
}

export function Text({
	children,
	variant = 'body1',
	color,
	weight,
	align,
	italic,
	uppercase,
	capitalize,
	truncate,
	lineClamp,
	fullWidth,
	component,
	className,
	style,
	...props
}: TextProps) {
	const Component = (component ??
		VARIANT_ELEMENTS[variant]) as React.ElementType;

	return (
		<Component
			className={cn(
				styles.root,
				styles[`variant-${variant}`],
				color && styles[`color-${color}`],
				weight && styles[`weight-${weight}`],
				align && styles[`align-${align}`],
				italic && styles.italic,
				uppercase && styles.uppercase,
				capitalize && styles.capitalize,
				truncate && styles.truncate,
				lineClamp && styles.lineClamp,
				fullWidth && styles.fullWidth,
				'ml-text',
				className,
			)}
			style={
				lineClamp ? { ...style, '--ml-text-line-clamp': lineClamp } : style
			}
			{...props}
		>
			{children}
		</Component>
	);
}
