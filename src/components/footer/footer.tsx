import { ComponentProps } from "../../interfaces/models";
import { classes } from "./footer.st.css";

export const Footer = (props: ComponentProps): JSX.Element => {
	const { translate, compKeys } = props;
	const licenseYears = `2021-${new Date().getFullYear()}`;
	const { siteTitle, siteLicense } = compKeys;
	return (
		<footer className={classes.root}>
			<div className={classes.license}>
				<time className={classes.year}>{licenseYears}</time>
				<span className={classes.license}>({translate(siteLicense)})</span>
				<span className={classes.title}>{translate(siteTitle)}</span>
			</div>
		</footer>
	);
};

export default Footer;
