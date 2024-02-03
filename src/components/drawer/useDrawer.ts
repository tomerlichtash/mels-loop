import { useEffect, useState } from 'react';

type DrawerState = {
	open: boolean;
	setDrawerState: (val: boolean) => void;
	toggle: (val?: boolean) => void;
};

const useDrawer = (reset): DrawerState => {
	const [open, setDrawerState] = useState(false);

	// reset drawer state
	useEffect(() => setDrawerState(false), [reset, setDrawerState]);

	useEffect(() => {
		if (!open) return;

		const handleKeydown = ({ key }) => {
			if (key === 'Escape') setDrawerState(false);
		};

		window.addEventListener('keydown', handleKeydown);

		return () => window.document.removeEventListener('keydown', handleKeydown);
	}, [open]);

	const toggle = () => {
		setDrawerState((prev) => !prev);
	};

	return { open, setDrawerState, toggle };
};

export { useDrawer };
