import Link from "next/link";
import LocaleSelector from "../locale-selector";
import { classes } from "./footer.st.css";

export const Footer = ({ isHome }: { isHome: boolean }): JSX.Element => {
	return (
		<footer className={classes.root}>
			{!isHome ? <Link href="/">← Back to home</Link> : null}
			<LocaleSelector />
		</footer>
	);
};

export default Footer;
