import { useEffect, useState } from "react";

type DrawerState = {
	open: boolean;
	setOpen: (val: boolean) => void;
	toggle: (val?: boolean) => void;
};

const useDrawer = (): DrawerState => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) return;

		const handleKeydown = ({ key }) => {
			if (key === "Escape") setOpen(false);
		};

		window.addEventListener("keydown", handleKeydown);

		return () => window.document.removeEventListener("keydown", handleKeydown);
	}, [open]);

	const toggle = () => {
    setOpen((prev) => !prev);
	};

	return { open, setOpen, toggle };
};

export default useDrawer;
