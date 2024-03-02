import { useState } from 'react';

export const useInputValidation = (
	getMessage: (validity: ValidityState) => string
) => {
	const [valid, setValid] = useState(false);
	const [invalid, setInvalid] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const validate = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { valid } = e.target.validity;
		setInvalid(valid === false);
		setValid(valid === true);
		setErrorMessage(getMessage(e.target.validity));
	};

	return { valid, invalid, errorMessage, validate };
};
