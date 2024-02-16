import React, { PropsWithChildren } from 'react';
import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import styles from './Text.module.scss';

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

const Text = ({
	asChild,
	variant,
	italics,
	weight,
	lowercase,
	uppercase,
	// locale = "en",
	children,
	className,
}: PropsWithChildren<TextProps>) => {
	const Comp = asChild ? Slot : 'span';

	return (
		<Comp
			data-variant={variant}
			data-italics={italics}
			data-lowercase={lowercase}
			data-uppercase={uppercase}
			data-weight={weight}
			// data-locale={locale}
			className={classNames(styles.root, className)}
		>
			{children}
		</Comp>
	);
};

export default Text;
export type { TextProps, TextVariant };
