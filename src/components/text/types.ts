type TextVariant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'subtitle1'
	| 'subtitle2'
	| 'body1'
	| 'body2';

type TextProps = {
	asChild?: boolean;
	variant?: TextVariant;
	italics?: boolean;
	weight?: number;
	lowercase?: boolean;
	uppercase?: boolean;
	locale?: string;
	className?: string;
};

export type { TextProps, TextVariant };
