import { SyntheticEvent } from 'react';

type InputProps = {
	id?: string;
	required?: boolean;
	placeholder?: string;
	value?: string | number;
	type?: 'text' | 'number' | 'tel' | 'file' | 'email';
	onChange?: (e: SyntheticEvent) => void;
	className?: string;
};

export type { InputProps };
