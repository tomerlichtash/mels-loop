type ContainerProps = {
	/** Container fixed `position` */
	sticky?: boolean;
	/** `sticky` position options */
	position?: 'top' | 'bottom';
	/** Add even space between container elements */
	spaceBetween?: boolean;
	/** Center container elements vertically */
	alignItemsCenter?: boolean;
	/** Full width container */
	fullWidth?: boolean;
	/** Add horizontal gutter */
	horizontalGutter?: boolean;
	/** Render container as slot  */
	asChild?: boolean;
	/** Classname */
	className?: string;
};

export type { ContainerProps };
