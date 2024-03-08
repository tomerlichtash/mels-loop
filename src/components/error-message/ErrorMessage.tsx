import React, { PropsWithChildren } from 'react';
import { getIcon } from 'components/icons';
import classNames from 'classnames';
import styles from './ErrorMessage.module.scss';
import { Link } from '..';

type ErrorMessageProps = {
	message?: string;
	icon?: string;
	label?: string;
	reportIssueUrl?: string;
	issueTrackerUrl?: string;
	className?: string;
};

const ErrorMessage = ({
	message,
	icon = 'cross',
	label,
	issueTrackerUrl,
	children,
	className,
}: PropsWithChildren<ErrorMessageProps>) => (
	<div className={classNames(styles.root, className)}>
		{getIcon(icon)} {message}
		{children ?? children}
		{!children && (
			<Link
				target="_blank"
				href={issueTrackerUrl}
			>
				{label}
			</Link>
		)}
	</div>
);

export default ErrorMessage;
export type { ErrorMessageProps };
