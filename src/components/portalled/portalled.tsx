import React, { useContext } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { ReactThemeContext } from "../../contexts/theme-context";
import { st, classes } from "../layout/layout.st.css";

export interface IPortalledProps {
	children: JSX.Element[];
	className?: string;
}

export const Portalled = ({
	children,
	className,
}: IPortalledProps): JSX.Element => {
	const { themeRef } = useContext(ReactThemeContext);
	const { textDirection } = useContext(ReactLocaleContext);
	return (
		<div className={st(themeRef, className)}>
			<div className={st(classes.root, { textDirection })}>{children}</div>
		</div>
	);
};

export default Portalled;
