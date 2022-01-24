import Link from "next/link";
import Nav from "../nav";
import { SitePage } from "../../interfaces/models";
import { ComponentProps } from "../../interfaces/models";
import { style, classes } from "./header.st.css";

export interface HeaderProps extends ComponentProps {
	pathname: string;
	isHome: boolean;
	sitePages: SitePage[];
}

export const Header = (props: HeaderProps): JSX.Element => {
	const { pathname, isHome, sitePages, compKeys, translate, className } = props;
	const { siteTitle, siteSubtitle } = compKeys;
	const title = translate(siteTitle);
	const subtitle = translate(siteSubtitle);
	return (
		<header className={style(classes.root, className)}>
			<div className={classes.container}>
				<div className={classes.title}>
					{isHome ? (
						<div className={classes.titleContainer}>
							<h1
								className={classes.siteTitle}
								title={`${title} - ${subtitle}`}
								aria-label={`${title} - ${subtitle}`}
							>
								{title}
							</h1>
							<span className={classes.siteSubtitle}>{subtitle}</span>
						</div>
					) : (
						<div className={classes.titleContainer}>
							<h1 className={classes.siteTitle}>
								<Link href="/">
									<a
										title={`${title} - ${subtitle}`}
										aria-label={`${title} - ${subtitle}`}
									>
										{title}
									</a>
								</Link>
							</h1>
							<span className={classes.siteSubtitle}>{subtitle}</span>
						</div>
					)}
				</div>
				<Nav
					sitePages={sitePages}
					className={classes.headerNav}
					translate={translate}
					pathname={pathname}
				/>
			</div>
		</header>
	);
};

export default Header;
