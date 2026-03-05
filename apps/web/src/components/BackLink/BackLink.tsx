import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import type { ReactNode } from 'react';

import styles from './BackLink.module.css';

interface BackLinkProps {
	href: string;
	children: ReactNode;
}

export function BackLink({ href, children }: BackLinkProps) {
	return (
		<Link href={href} className={styles.root}>
			<ArrowLeftIcon className={styles.icon} />
			{children}
		</Link>
	);
}
