import { useEffect, useInsertionEffect, useRef } from 'react';

export const useEffectOnce = (effect: () => void | (() => void)) => {
	const isEffectAlreadyCalledRef = useRef(false);
	const isActualUnmountRef = useRef(false);
	const cleanupRef = useRef(() => {});

	useInsertionEffect(() => {
		return () => {
			isActualUnmountRef.current = true;
		};
	}, []);

	useEffect(() => {
		if (!isEffectAlreadyCalledRef.current) {
			isEffectAlreadyCalledRef.current = true;
			let cleanup = effect();
			if (typeof cleanup === 'function') {
				cleanupRef.current = cleanup;
			}
		}

		return () => {
			if (isActualUnmountRef.current) {
				cleanupRef.current();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
