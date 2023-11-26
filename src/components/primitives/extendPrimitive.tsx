// https://www.radix-ui.com/primitives/docs/guides/styling#extending-a-primitive

/* eslint-disable react/display-name */
import { forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extendPrimitive = (Comp: React.ComponentType<any>) =>
	forwardRef<
		React.ElementRef<typeof Comp>,
		React.ComponentPropsWithoutRef<typeof Comp>
	>((props, forwardedRef) => {
		const { className, ...rest } = props;
		return <Comp ref={forwardedRef} className={className} {...rest} />;
	});

export default extendPrimitive;
