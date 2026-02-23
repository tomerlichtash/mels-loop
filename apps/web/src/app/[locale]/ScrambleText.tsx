'use client';

import { useEffect, useRef, useState } from 'react';

const CHARS = '01!@#$%&*+=<>/?~ABCDEFabcdef';

function randomChar() {
	return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface ScrambleTextProps {
	text: string;
	className?: string;
	/** Milliseconds between each character reveal */
	speed?: number;
	/** Number of random cycles before a character settles */
	cycles?: number;
}

export function ScrambleText({
	text,
	className,
	speed = 50,
	cycles = 3,
}: ScrambleTextProps) {
	const [display, setDisplay] = useState('');
	const frameRef = useRef<number>(0);
	const startedRef = useRef(false);

	useEffect(() => {
		if (startedRef.current) return;
		startedRef.current = true;

		let revealIndex = 0;
		let tickCount = 0;
		let lastTime = 0;

		const step = (time: number) => {
			if (time - lastTime < speed) {
				frameRef.current = requestAnimationFrame(step);
				return;
			}
			lastTime = time;
			tickCount++;

			const chars: string[] = [];
			for (let i = 0; i < text.length; i++) {
				if (text[i] === ' ') {
					chars.push(' ');
				} else if (i < revealIndex) {
					chars.push(text[i]);
				} else {
					chars.push(randomChar());
				}
			}

			setDisplay(chars.join(''));

			if (tickCount % cycles === 0 && revealIndex < text.length) {
				// Skip spaces when advancing
				revealIndex++;
				while (revealIndex < text.length && text[revealIndex] === ' ') {
					revealIndex++;
				}
			}

			if (revealIndex < text.length) {
				frameRef.current = requestAnimationFrame(step);
			} else {
				setDisplay(text);
			}
		};

		// Start with scrambled text immediately
		setDisplay(
			text
				.split('')
				.map((c) => (c === ' ' ? ' ' : randomChar()))
				.join(''),
		);
		frameRef.current = requestAnimationFrame(step);

		return () => cancelAnimationFrame(frameRef.current);
	}, [text, speed, cycles]);

	return <span className={className}>{display || text}</span>;
}
