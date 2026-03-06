import type { ReactNode } from 'react';

import styles from './template.module.css';

export default function Template({ children }: { children: ReactNode }) {
	return <div className={styles.root}>{children}</div>;
}
