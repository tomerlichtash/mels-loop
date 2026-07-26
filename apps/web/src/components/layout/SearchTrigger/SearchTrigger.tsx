import { MagnifyingGlassIcon } from '@phosphor-icons/react/ssr';

import styles from './SearchTrigger.module.css';

interface SearchTriggerProps {
	onClick: () => void;
	label: string;
}

export function SearchTrigger({ onClick, label }: SearchTriggerProps) {
	return (
		<button
			type="button"
			className={styles.root}
			onClick={onClick}
			aria-label={label}
		>
			<MagnifyingGlassIcon className={styles.icon} size={14} />
		</button>
	);
}
