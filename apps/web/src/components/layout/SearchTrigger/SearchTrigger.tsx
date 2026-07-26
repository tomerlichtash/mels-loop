import { MagnifyingGlassIcon } from '@phosphor-icons/react/ssr';

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
	return (
		<button
			type="button"
			className={styles.root}
			onClick={onClick}
			aria-label={label}
		>
			<MagnifyingGlassIcon className={styles.icon} size={14} />
			<span className={styles.placeholder}>{placeholder}</span>
		</button>
	);
}
