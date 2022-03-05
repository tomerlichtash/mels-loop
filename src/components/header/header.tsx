import React, { useContext } from "react";
import Nav from "../nav";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { style, classes } from "./header.st.css";

export const Header = ({
	compKeys,
	className,
}: ComponentProps): JSX.Element => {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate, pageId } = layoutContext;
	const { siteTitle, siteSubtitle } = compKeys;
	const title = translate(siteTitle);
	const subtitle = translate(siteSubtitle);
	const fullTitle = `${title} - ${subtitle}`;
	return (
		<header className={style(classes.root, className)}>
			<div className={classes.container}>
				<div className={classes.title}>
					{pageId === "home" ? (
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
				<Nav className={classes.headerNav} />
			</div>
		</header>
	);
};

export default Header;
