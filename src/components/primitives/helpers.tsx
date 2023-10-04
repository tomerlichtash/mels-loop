/* eslint-disable react/display-name */
import { forwardRef } from "react";

export const createCompRef = (Comp: React.ComponentType<any>) =>
	forwardRef<React.ElementRef<typeof Comp>, React.ComponentProps<typeof Comp>>(
		(props, ref) => {
			const { className, ...rest } = props;
			return <Comp ref={ref} className={className} {...rest} />;
		}
	);
