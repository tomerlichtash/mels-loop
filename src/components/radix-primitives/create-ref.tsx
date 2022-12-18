import React from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCompRef = (Comp: any) =>
	React.forwardRef<
		React.ElementRef<typeof Comp>,
		React.ComponentProps<typeof Comp>
	>((props, forwardedRef) => {
		const { className, ...itemProps } = props;
		return <Comp {...itemProps} ref={forwardedRef} className={className} />;
	});
