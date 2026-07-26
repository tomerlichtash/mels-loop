'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
	end: number;
	duration?: number;
	className?: string;
}

export function CountUp({ end, duration = 1200, className }: CountUpProps) {
	const [count, setCount] = useState(0);
	const ref = useRef<HTMLSpanElement>(null);
	const hasAnimated = useRef(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasAnimated.current) {
					hasAnimated.current = true;
					const start = performance.now();
					const step = (now: number) => {
						const progress = Math.min((now - start) / duration, 1);
						const eased = 1 - Math.pow(1 - progress, 3);
						setCount(Math.round(eased * end));
						if (progress < 1) requestAnimationFrame(step);
					};
					requestAnimationFrame(step);
				}
			},
			{ threshold: 0.5 },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [end, duration]);

	return (
		<span ref={ref} className={className}>
			{count}
		</span>
	);
}
