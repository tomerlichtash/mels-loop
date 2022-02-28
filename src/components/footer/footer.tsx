import React, { useContext } from "react";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { ComponentProps } from "../../interfaces/models";
import { style, classes } from "./footer.st.css";

export const Footer = (props: ComponentProps): JSX.Element => {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate } = layoutContext;
	const { compKeys, className } = props;
	const licenseYears = `2021-${new Date().getFullYear()}`;
	const { siteTitle, siteLicense } = compKeys;
	return (
		<footer className={style(classes.root, className)}>
			<div className={classes.license}>
				<time className={classes.year}>{licenseYears}</time>
				<span className={classes.license}>({translate(siteLicense)})</span>
				<span className={classes.title}>{translate(siteTitle)}</span>
			</div>
		</footer>
	);
};

export default Footer;
