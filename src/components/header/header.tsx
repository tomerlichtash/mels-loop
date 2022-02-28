import React, { useContext } from "react";
import Nav from "../nav";
import { SitePage } from "../../interfaces/models";
import { ComponentProps } from "../../interfaces/models";
import { style, classes } from "./header.st.css";
import { Button } from "../ui";
import { ReactLayoutContext } from "../../contexts/layout-context";

export interface HeaderProps extends ComponentProps {
	pathname: string;
	isHome: boolean;
	sitePages: SitePage[];
}

export const Header = (props: HeaderProps, context): JSX.Element => {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate } = layoutContext;
	const { pathname, isHome, sitePages, compKeys, className } = props;
	const { siteTitle, siteSubtitle } = compKeys;
	const title = translate(siteTitle);
	const subtitle = translate(siteSubtitle);
	const fullTitle = `${title} - ${subtitle}`;
	debugger;
	return (
		<header className={style(classes.root, className)}>
			<div className={classes.container}>
				<div className={classes.title}>
					{isHome ? (
						<div className={classes.titleContainer}>
							<h1
								className={classes.siteTitle}
								title={fullTitle}
								aria-label={fullTitle}
							>
								{title}
							</h1>
							<span className={classes.siteSubtitle}>{subtitle}</span>
						</div>
					) : (
						<div className={classes.titleContainer}>
							<h1 className={classes.siteTitleHeading}>
								<Button
									label={title}
									title={fullTitle}
									link={"/"}
									className={classes.siteTitle}
								/>
							</h1>
							<span className={classes.siteSubtitle}>{subtitle}</span>
						</div>
					)}
				</div>
				<Nav
					sitePages={sitePages}
					className={classes.headerNav}
					pathname={pathname}
				/>
			</div>
		</header>
	);
};

export default Header;
