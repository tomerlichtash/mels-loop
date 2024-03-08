import React, { PropsWithChildren } from 'react';
import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import styles from './Text.module.scss';

type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type SubtitleVariant = 'subtitle1' | 'subtitle2' | 'subtitle3' | 'subtitle4';
type TextVariant = 'body1' | 'body2';

type TextProps = {
	asChild?: boolean;
	variant?: TextVariant | HeadingVariant | SubtitleVariant;
	italics?: boolean;
	weight?: number;
	locale?: string;
	className?: string;
};

const Text = ({ asChild, variant, children, className }: PropsWithChildren<TextProps>) => {
	const Comp = asChild ? Slot : 'span';

	return (
		<Comp
			data-variant={variant}
			className={classNames(styles.root, className)}
		>
			{children}
		</Comp>
	);
};

export default Text;
export type { TextProps, TextVariant, HeadingVariant, SubtitleVariant };
