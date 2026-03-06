'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './GlyphShift.module.css';
import { VARIANTS, VARIANTS_HE } from './glyphVariants';

/** Build the full strip for a character: real char at index 0, then variants */
function getStrip(char: string): string[] {
	const lower = char.toLowerCase();
	const variants = VARIANTS[lower] ?? VARIANTS_HE[char] ?? [];
	return [char, ...variants];
}

interface GlyphShiftProps {
	text?: string;
	className?: string;
	/** Milliseconds between each character change */
	speed?: number;
}

export function GlyphShift({
	text = '',
	className,
	speed = 40,
}: GlyphShiftProps) {
	// Precompute strips once
	const strips = useRef(
		text.split('').map((c) => (c === ' ' ? [' '] : getStrip(c))),
	);

	// Index into each strip — 0 = real char (matches SSR)
	const [indices, setIndices] = useState<number[]>(() =>
		new Array(text.length).fill(0),
	);

	// Per-char transition duration (randomized on each swap)
	const [durations, setDurations] = useState<number[]>(() =>
		new Array(text.length).fill(500),
	);

	const charIndices = useRef(
		text
			.split('')
			.map((c, i) => (c === ' ' ? -1 : i))
			.filter((i) => i >= 0),
	);

	// Map from text position → gradient position (skipping spaces)
	const charPositionMap = useRef(
		(() => {
			const map: Record<number, number> = {};
			let pos = 0;
			for (let i = 0; i < text.length; i++) {
				if (text[i] !== ' ') {
					map[i] = pos++;
				}
			}
			return map;
		})(),
	);

	const frameRef = useRef<number>(0);

	const tick = useCallback(() => {
		const ci = charIndices.current;
		if (ci.length === 0) return;

		const maxSwaps = Math.max(1, Math.floor(ci.length / 2));
		const count = 1 + Math.floor(Math.random() * maxSwaps);

		const picked = new Set<number>();
		while (picked.size < count) {
			picked.add(ci[Math.floor(Math.random() * ci.length)]);
		}

		setIndices((prev) => {
			const next = [...prev];
			for (const pos of picked) {
				const stripLen = strips.current[pos].length;
				let newIdx: number;
				do {
					newIdx = Math.floor(Math.random() * stripLen);
				} while (newIdx === next[pos] && stripLen > 1);
				next[pos] = newIdx;
			}
			return next;
		});

		setDurations((prev) => {
			const next = [...prev];
			for (const pos of picked) {
				next[pos] = 300 + Math.floor(Math.random() * 500); // 300–800ms
			}
			return next;
		});
	}, []);

	useEffect(() => {
		let lastTime = 0;
		let delay = speed;
		const step = (time: number) => {
			if (time - lastTime < delay) {
				frameRef.current = requestAnimationFrame(step);
				return;
			}
			lastTime = time;
			delay = speed * (0.65 + Math.random() * 0.7); // ±35%
			tick();
			frameRef.current = requestAnimationFrame(step);
		};

		frameRef.current = requestAnimationFrame(step);
		return () => cancelAnimationFrame(frameRef.current);
	}, [speed, tick]);

	if (!text) return null;

	const cellHeight = 1.4; // em — must match CSS
	const totalChars = charIndices.current.length;

	return (
		<span
			className={className}
			style={{ '--total-chars': totalChars } as React.CSSProperties}
		>
			{strips.current.map((strip, i) =>
				text[i] === ' ' ? (
					' '
				) : (
					<span key={i} className={styles.charWrap}>
						<span
							className={styles.strip}
							style={{
								transform: `translateY(${-indices[i] * cellHeight}em)`,
								transitionDuration: `${durations[i]}ms`,
							}}
						>
							{strip.map((char, j) => (
								<span
									key={j}
									className={`${styles.cell}${j === 0 ? ` ${styles.original}` : ''}`}
									style={
										{
											'--char-index': charPositionMap.current[i],
											// opacity: j === indices[i] ? 1 : 0,
											// transitionDuration: j === indices[i]
											// 	? `${durations[i] / 1.8}ms`
											// 	: `${durations[i] / 2.2}ms`,
										} as React.CSSProperties
									}
								>
									{char}
								</span>
							))}
						</span>
					</span>
				),
			)}
		</span>
	);
}
