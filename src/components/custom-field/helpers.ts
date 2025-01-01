type GetErrorMessageProps = {
	validity: ValidityState;
	translateFn?: (s: string) => string;
};
export const getValidityErrorMessage = ({
	validity,
	translateFn,
}: GetErrorMessageProps) => {
	const {
		valueMissing,
		typeMismatch,
		badInput,
		customError,
		patternMismatch,
		rangeOverflow,
		rangeUnderflow,
		stepMismatch,
		tooLong,
		tooShort,
		valid,
	} = validity;

	if (valid) {
		return '';
	}

	if (valueMissing) {
		return translateFn?.('valueMissing') || 'Value missing';
	}

	if (typeMismatch) {
		return translateFn?.('typeMismatch') || 'Type mismatch';
	}

	if (badInput) {
		return translateFn?.('badInput') || 'Bad input';
	}

	if (customError) {
		return translateFn?.('customError') || 'Custom error';
	}

	if (patternMismatch) {
		return translateFn?.('patternMismatch') || 'Pattern mismatch';
	}

	if (rangeOverflow) {
		return translateFn?.('rangeOverflow') || 'Range overflow';
	}

	if (rangeUnderflow) {
		return translateFn?.('rangeUnderflow') || 'Range underflow';
	}

	if (stepMismatch) {
		return translateFn?.('stepMismatch') || 'Step mismatch';
	}

	if (tooLong) {
		return translateFn?.('tooLong') || 'Too long';
	}

	if (tooShort) {
		return translateFn?.('tooShort') || 'Too short';
	}

	return '';
};
