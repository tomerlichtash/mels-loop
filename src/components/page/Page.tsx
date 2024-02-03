import React, { PropsWithChildren } from 'react';
import styles from './Page.module.scss';

export type PageProps = {
	className?: string;
};

const Page = ({ children }: PropsWithChildren<PageProps>) => (
	<main className={styles.root}>{children}</main>
);

export default Page;
