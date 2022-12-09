/* eslint-disable react/display-name */
import React from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCompRef = (Comp: any) =>
	React.forwardRef<
		React.ElementRef<typeof Comp>,
		React.ComponentProps<typeof Comp>
	>((props, forwardedRef) => {
		// eslint-disable-next-line react/prop-types
		const { className, ...itemProps } = props;
		return <Comp {...itemProps} ref={forwardedRef} className={className} />;
	});
