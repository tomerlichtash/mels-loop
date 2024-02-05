type DrawerProps = {
	open: boolean;
	direction: 'left' | 'right' | 'top' | 'bottom';
	duration?: number;
	enableOverlay?: boolean;
	lockBackgroundScroll?: boolean;
	overlayOpacity?: number;
	overlayColor?: string;
	size?: number | string;
	zIndex?: number;
	className?: string;
	onClose?: () => void;
	// customIdSuffix?: string;
	// overlayClassName?: string;
	// style?: React.CSSProperties;
};

export type { DrawerProps };
