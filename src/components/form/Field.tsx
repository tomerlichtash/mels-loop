import React, { PropsWithChildren, useMemo } from 'react';
import { useField } from 'formik';
import classNames from 'classnames';
import styles from './Field.module.scss';
import CustomField from 'components/custom-field/CustomField';

type FormikFormFieldProps = {
	name: string;
	label?: string;
	placeholder?: string;
	icon?: string;
	required?: boolean;
	className?: string;
};

const FormField = ({
	name,
	label,
	icon,
	required,
	children,
	className,
	...rest
}: PropsWithChildren<FormikFormFieldProps>) => {
	const [field, meta] = useField({ name, ...rest });

	const isInvalid = !!meta.touched && !!meta?.error?.length;
	const isValid = meta.touched && !meta?.error?.length;

	// const childrenWithProps = useMemo(
	// 	() =>
	// 		React.Children.map(children, (child) => {
	// 			if (React.isValidElement(child)) {
	// 				return React.cloneElement(child, {
	// 					...rest,
	// 					...field,
	// 					...{
	// 						'data-is-invalid': isInvalid ? 'true' : 'false',
	// 						'data-is-valid': isValid ? 'true' : 'false',
	// 						'data-error-message': meta.error,
	// 						required,
	// 						// onBlur: (e) => {
	// 						// 	setTouched({ [name]: true });
	// 						// 	console.log('blur');
	// 						// },
	// 					},
	// 				});
	// 			}
	// 			return child;
	// 		}),
	// 	[children, field, isInvalid, isValid, meta.error, required, rest]
	// );

	return useMemo(
		() => (
			// <div
			// 	className={classNames(styles.root, className)}
			// 	data-field-name={name}
			// 	data-is-invalid={isInvalid}
			// 	data-is-valid={isValid}
			// >
			<CustomField
				label={label}
				icon={icon}
				touched={meta.touched}
				error={meta.error}
				field={field}
				required={required}
			>
				{children}
			</CustomField>
			// </div>
		),
		[
			className,
			name,
			isInvalid,
			isValid,
			label,
			icon,
			meta.touched,
			meta.error,
			field,
			required,
			children,
		]
	);
};

export default FormField;
