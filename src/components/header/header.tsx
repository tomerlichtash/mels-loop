import React, { useContext } from "react";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { st, classes } from "./header.st.css";

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
		<header className={st(classes.root, className)}>
			<div className={classes.container}>
				<div className={classes.title}>
					{/* {pageId === "home" ? ( */}
					<div className={classes.titleContainer}>
						<div className={st(classes.siteTitle, "locator-site-title")}>
							{pageId === "home" ? (
								title
							) : (
								<Button
									label={title}
									title={fullTitle}
									link={"/"}
									className={classes.siteTitle}
								/>
							)}
							{/* <h1
								className={classes.siteTitle}
								title={fullTitle}
								aria-label={fullTitle}
							>
								{title}
							</h1> */}
						</div>
						<div className={classes.siteSubtitle}>{subtitle}</div>
					</div>
					{/* ) : (
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
					)} */}
				</div>
			</div>
		</header>
	);
};

export default Header;
