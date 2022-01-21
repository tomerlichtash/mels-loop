import Link from "next/link";
import LocaleSelector from "../locale-selector";
import Nav from "../nav";
import { IOption } from "../../interfaces/models";
import { classes } from "./header.st.css";

export const Header = ({
	siteTitle,
	siteSubtitle,
	isHome,
	sitePages,
}: {
	isHome: boolean;
	siteTitle: string;
	siteSubtitle: string;
	sitePages: IOption[];
}): JSX.Element => {
	return (
		<header className={classes.root}>
			<LocaleSelector className={classes.localeSelector} />
			<div className={classes.container}>
				<div className={classes.title}>
					{isHome ? (
						<div className={classes.titleContainer}>
							<h1
								className={classes.siteTitle}
								title={`${siteTitle} - ${siteSubtitle}`}
								aria-label={`${siteTitle} - ${siteSubtitle}`}
							>
								{siteTitle}
							</h1>
							<span className={classes.siteSubtitle}>{siteSubtitle}</span>
						</div>
					) : (
						<div className={classes.titleContainer}>
							<h1 className={classes.siteTitle}>
								<Link href="/">
									<a
										title={`${siteTitle} - ${siteSubtitle}`}
										aria-label={`${siteTitle} - ${siteSubtitle}`}
									>
										{siteTitle}
									</a>
								</Link>
							</h1>
							<span className={classes.siteSubtitle}>{siteSubtitle}</span>
						</div>
					)}
				</div>
				<Nav sitePages={sitePages} className={classes.headerNav} />
			</div>
		</header>
	);
};

export default Header;
