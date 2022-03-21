import React, { useContext } from "react";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { ComponentProps } from "../../interfaces/models";
import { st, classes } from "./footer.st.css";

export const Footer = ({
	compKeys,
	className,
}: ComponentProps): JSX.Element => {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate } = layoutContext;
	const licenseYears = `2021-${new Date().getFullYear()}`;
	const { siteTitle, siteLicense } = compKeys;
	return (
		<footer className={st(classes.root, className)}>
			<div className={classes.license}>
				<time className={classes.year}>{licenseYears}</time>{" "}
				<span className={classes.license}>({translate(siteLicense)})</span>{" "}
				<span className={classes.title}>{translate(siteTitle)}</span>
			</div>
		</footer>
	);
};

export default Footer;
