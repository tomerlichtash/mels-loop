import Link from "next/link";
import { style, classes } from "./nav.st.css";
import { useRouter } from "next/router";

export const Nav = (): JSX.Element => {
	const router = useRouter();
	const { pathname } = router;
	return (
		<nav className={classes.root}>
			<div className={classes.menu}>
				<ul className={classes.list}>
					<li>
						<Link href="/">
							<a
								className={style(classes.button, {
									current: pathname === "/",
								})}
							>
								Home
							</a>
						</Link>
						<Link href="/about">
							<a
								className={style(classes.button, {
									current: pathname === "/about",
								})}
							>
								About
							</a>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
