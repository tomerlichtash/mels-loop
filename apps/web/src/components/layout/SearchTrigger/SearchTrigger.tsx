import { MagnifyingGlassIcon } from '@phosphor-icons/react/ssr';
import { useEffect, useState } from 'react';

import styles from './SearchTrigger.module.css';

interface SearchTriggerProps {
	onClick: () => void;
	placeholder: string;
	label: string;
}

export function SearchTrigger({
	onClick,
	placeholder,
	label,
}: SearchTriggerProps) {
	const [isMac, setIsMac] = useState(false);
	useEffect(() => {
		setIsMac(/Mac|iPhone|iPod|iPad/i.test(navigator.userAgent));
	}, []);

	return (
		<button
			type="button"
			className={styles.root}
			onClick={onClick}
			aria-label={label}
		>
			<MagnifyingGlassIcon className={styles.icon} size={14} />
			<span className={styles.placeholder}>{placeholder}</span>
			<span className={styles.kbd}>
				<kbd>{isMac ? '\u2318' : 'Ctrl'}</kbd>
				<kbd>K</kbd>
			</span>
		</button>
	);
}
