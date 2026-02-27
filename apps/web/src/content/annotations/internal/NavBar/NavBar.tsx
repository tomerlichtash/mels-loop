'use client';

import { useAnnotations } from '../../PopoverProvider/PopoverProvider';
import styles from './NavBar.module.css';

interface NavBarProps {
	rootLabel: string;
}

export function NavBar({ rootLabel }: NavBarProps) {
	const { navStack, popNavTo } = useAnnotations();

	if (navStack.length === 0) return null;

	return (
		<nav className={styles.root} aria-label="Popover navigation">
			<button
				type="button"
				className={styles.crumb}
				onClick={() => popNavTo(-1)}
			>
				{rootLabel}
			</button>
			{navStack.map((entry, i) => {
				const isLast = i === navStack.length - 1;
				return (
					<span key={i}>
						<span className={styles.separator} aria-hidden>
							›
						</span>{' '}
						{isLast ? (
							<span className={styles.current}>{entry.label}</span>
						) : (
							<button
								type="button"
								className={styles.crumb}
								onClick={() => popNavTo(i)}
							>
								{entry.label}
							</button>
						)}
					</span>
				);
			})}
		</nav>
	);
}
