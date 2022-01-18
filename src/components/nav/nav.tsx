import Link from "next/link";
import { classes } from "./nav.st.css";
import LocaleSelector from "../locale-selector";

export const Nav = (): JSX.Element => {
	return (
		<nav className={classes.root}>
			<ul className={classes.list}>
				<li>
					<Link href="/">
						<a className={classes.button}>Home</a>
					</Link>
					<Link href="/about">
						<a className={classes.button}>About</a>
					</Link>
				</li>
			</ul>
			<LocaleSelector />
		</nav>
	);
};

export default Nav;
