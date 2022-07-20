import React, { useContext } from "react";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { st, classes } from "./header.st.css";

export const Header = ({ className }: ComponentProps): JSX.Element => {
	const { siteTitle, siteSubtitle, textDirection } =
		useContext(ReactLocaleContext);
	return (
		<header className={st(classes.root, { textDirection }, className)}>
			<div className={classes.container} data-test-id="site_name">
				<Button
					icon={<div className={classes.siteLogo}></div>}
					label={siteTitle}
					title={`${siteTitle} - ${siteSubtitle}`}
					link={"/"}
					callback={() => false}
					className={classes.siteTitle}
				/>
				<div className={classes.siteSubtitle} aria-label={siteSubtitle}>
					{siteSubtitle}
				</div>
			</div>
		</header>
	);
};

export default Header;
