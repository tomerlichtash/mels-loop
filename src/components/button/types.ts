import { SyntheticEvent } from 'react';

type ButtonProps = {
	title?: string;
	asChild?: boolean;
	onClick?: (e: SyntheticEvent | string | number | boolean) => void;
	className?: string;
};

export type { ButtonProps };
