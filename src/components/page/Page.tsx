import React, { PropsWithChildren } from 'react';
import styles from './Page.module.scss';
import classNames from 'classnames';

type PageProps = {
	className?: string;
};

const Page = ({ children, className }: PropsWithChildren<PageProps>) => (
	<main className={classNames(styles.root, className)}>{children}</main>
);

export default Page;
