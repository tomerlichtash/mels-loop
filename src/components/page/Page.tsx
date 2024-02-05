import React, { PropsWithChildren } from 'react';
import styles from './Page.module.scss';
import { PageProps } from './types';

const Page = ({ children }: PropsWithChildren<PageProps>) => (
	<main className={styles.root}>{children}</main>
);

export default Page;
