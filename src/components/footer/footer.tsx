import { classes } from "./footer.st.css";

export const Footer = (): JSX.Element => {
	return (
		<footer className={classes.root}>
			<div className={classes.license}>2022 (cc-by) Mel's Loop</div>
		</footer>
	);
};

export default Footer;
