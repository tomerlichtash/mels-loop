import Link from "next/link";
import LocaleSelector from "../locale-selector";
import { classes } from "./footer.st.css";

export const Footer = ({ isHome }: { isHome: boolean }): JSX.Element => {
	return (
		<footer className={classes.root}>
			<div className={classes.license}>2022 (cc-by) Mel's Loop</div>
			{!isHome ? <Link href="/">← Back to home</Link> : null}
			<LocaleSelector />
		</footer>
	);
};

export default Footer;
