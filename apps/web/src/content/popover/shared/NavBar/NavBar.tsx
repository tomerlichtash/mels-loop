'use client';

import { ArrowLeftIcon } from '@phosphor-icons/react/ssr';

import { useAnnotations } from '../../providers/PopoverProvider';
import styles from './NavBar.module.css';

interface NavBarProps {
	/** The entry the popover opened on, before any inline navigation. */
	rootLabel: string;
}

/**
 * The path back, for a popover the reader has navigated inside.
 *
 * Shows ancestors only. The last entry on the stack is the entry currently
 * displayed, and the panel's own heading already names it — listing it again
 * as the tail of a trail directly above that heading read as the title printed
 * twice.
 *
 * Sits above the title rather than below it, because it says where the reader
 * came from: underneath, it arrived after they had already read where they are.
 */
export function NavBar({ rootLabel }: NavBarProps) {
	const { navStack, popNavTo } = useAnnotations();

	if (navStack.length === 0) return null;

	/* -1 pops back to the entry the popover opened on. */
	const crumbs = [
		{ label: rootLabel, index: -1 },
		...navStack
			.slice(0, -1)
			.map((entry, i) => ({ label: entry.label, index: i })),
	];
	const previous = crumbs[crumbs.length - 1];

	return (
		<nav className={styles.root} aria-label="Popover history">
			{/*
			 * A back control as well as the trail. The trail alone works with a
			 * pointer, but on a phone its crumbs are small targets, and one step
			 * back is the move a reader almost always wants.
			 */}
			<button
				type="button"
				className={styles.back}
				onClick={() => popNavTo(previous.index)}
				aria-label={`Back to ${previous.label}`}
			>
				<ArrowLeftIcon size={12} />
			</button>
			<ol className={styles.trail}>
				{crumbs.map((crumb) => (
					<li key={crumb.index} className={styles.crumbItem}>
						<button
							type="button"
							className={styles.crumb}
							onClick={() => popNavTo(crumb.index)}
						>
							{crumb.label}
						</button>
					</li>
				))}
			</ol>
		</nav>
	);
}
