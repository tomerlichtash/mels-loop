import React, { PropsWithChildren, useMemo } from 'react';
import { useField } from 'formik';
import classNames from 'classnames';
import styles from './Field.module.scss';
import { getIcon } from 'components/icons';

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
	children,
	className,
	...rest
}: PropsWithChildren<FormikFormFieldProps>) => {
	const [field, meta] = useField({ name, ...rest });

	const isInvalid = !!meta.touched && !!meta?.error?.length;
	const isValid = meta.touched && !meta?.error?.length;

	const childrenWithProps = useMemo(
		() =>
			React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child, {
						...rest,
						...field,
						...{
							'data-is-invalid': isInvalid ? 'true' : 'false',
							'data-is-valid': isValid ? 'true' : 'false',
							'data-error-message': meta.error,
						},
					});
				}
				return child;
			}),
		[children, field, isInvalid, isValid, meta.error, rest]
	);

	return useMemo(
		() => (
			<div
				className={classNames(styles.root, className)}
				data-field-name={name}
				data-is-invalid={isInvalid}
				data-is-valid={isValid}
			>
				<label className={styles.content}>
					<span className={styles.layout}>
						<span className={styles.container}>
							<span className={styles.label}>
								<span className={styles.icon}>
									{getIcon(icon, styles.icon)}
								</span>
								<span className={styles.text}>
									{label}
									<span className={styles.requiredIndicator}></span>
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
									{meta.touched && meta.error && (
										<div
											className={classNames(
												styles.validation,
												isInvalid ? styles.showValidation : ''
											)}
										>
											{meta.error}
										</div>
									)}
								</span>
							</span>
						</span>
					</span>
				</label>
			</div>
		),
		[
			className,
			name,
			isInvalid,
			isValid,
			icon,
			label,
			childrenWithProps,
			meta.touched,
			meta.error,
		]
	);
};

export default FormField;
