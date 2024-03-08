import React, { useMemo } from 'react';
import { getIcon } from 'components/icons';
import styles from './CustomField.module.scss';
import classNames from 'classnames';
import type { PropsWithChildren, SyntheticEvent } from 'react';

type CustomFieldProps = {
	name?: string;
	label?: string;
	icon?: string;
	required?: boolean;
	placeholder?: string;
	field?: object;
	type?: 'text' | 'number' | 'tel' | 'email' | 'textarea';
	value?: string | number;
	isInvalid?: boolean;
	isValid?: boolean;
	errorMessage?: string;
	onChange?: (e: SyntheticEvent) => void;
	onBlur?: (e: SyntheticEvent) => void;
	className?: string;
};

const CustomField = ({
	name,
	label,
	icon,
	required,
	placeholder,
	type,
	value,
	className,
	isInvalid,
	isValid,
	errorMessage,
	children,
	...rest
}: PropsWithChildren<CustomFieldProps>) => {
	const childrenWithProps = useMemo(
		() =>
			React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child, {
						...{
							name,
							required,
							placeholder,
							type,
							className: classNames(styles.input, className),
							value,
							// onBlur: onCustomFieldBlur,
							// 'data-is-invalid': isInvalid ? 'true' : 'false',
							// 'data-is-valid': isValid ? 'true' : 'false',
							// 'data-error-message': error,
							// id,
							// onBlur: (e) => {
							// 	setTouched({ [name]: true });
							// 	console.log('blur');
							// },
						},
						...rest,
					});
				}
				return child;
			}),
		[children, name, required, placeholder, type, className, value, rest]
	);

	return (
		<div className={styles.root}>
			<label
				data-is-invalid={isInvalid}
				data-is-valid={isValid}
			>
				<span className={styles.layout}>
					<span className={styles.container}>
						<span className={styles.label}>
							{icon && <span className={styles.icon}>{getIcon(icon, styles.icon)}</span>}
							<span className={styles.text}>
								{label}
								{required && <span className={styles.requiredIndicator}></span>}
								{/* {isValid && (
										<span className={styles.validIndicator}>
											{getIcon('check', styles.checkIcon)}
										</span>
									)} */}
							</span>
							{/* {isValid ? getIcon('check', styles.checkIcon) : ''} */}
						</span>
						<span className={classNames(styles.inputField)}>
							<span className={styles.inputFieldContainer}>
								{childrenWithProps}
								{isInvalid && errorMessage && (
									<span
										className={classNames(
											styles.validation,
											isInvalid ? styles.showValidation : ''
										)}
									>
										{errorMessage}
									</span>
								)}
							</span>
						</span>
					</span>
				</span>
			</label>
		</div>
	);
};

export default CustomField;
export type { CustomFieldProps };
