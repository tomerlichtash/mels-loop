import Link from "next/link";
import { classes } from "./header.st.css";
import LocaleSelector from "../locale-selector";

export const Header = ({
	isHome,
	name,
}: {
	isHome: boolean;
	name: string;
}): JSX.Element => {
	// const router = useRouter();
	// const { locales } = router;
	// const locs = locales as ILocale[];
	return (
		<header className={classes.root}>
			<div className={classes.topBar}>
				<LocaleSelector />
			</div>
			{isHome ? (
				<h1 className={classes.siteTitle}>{name}</h1>
			) : (
				<h1 className={classes.siteTitle}>
					<Link href="/">{name}</Link>
				</h1>
			)}
		</header>
	);
};

export default Header;
