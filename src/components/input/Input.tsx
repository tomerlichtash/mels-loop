import React from 'react';
import CustomField, {
	type CustomFieldProps,
} from 'components/custom-field/CustomField';
import { getValidityErrorMessage } from 'components/custom-field/helpers';
import { useInputValidation } from '../../hooks/useInputValidation';
import classNames from 'classnames';
import styles from './Input.module.scss';

type InputProps = {
	translateFn: (s: string) => string;
} & CustomFieldProps;

const Input = ({
	label,
	name,
	required,
	placeholder,
	type,
	value,
	translateFn,
	className,
	...rest
}: InputProps) => {
	const trErrorMessage = (validity: ValidityState) =>
		getValidityErrorMessage({
			validity,
			translateFn,
		});

	const { valid, invalid, errorMessage, validate } =
		useInputValidation(trErrorMessage);

	const CustomInput = type === 'textarea' ? 'textarea' : 'input';

	return (
		<CustomField
			name={name}
			label={label}
			type={type}
			required={required}
			placeholder={placeholder}
			value={value}
			className={classNames(styles.root, className)}
			isValid={valid}
			isInvalid={invalid}
			errorMessage={errorMessage}
			{...rest}
		>
			<CustomInput onChange={validate} onBlur={validate} />
		</CustomField>
	);
};

export default Input;
