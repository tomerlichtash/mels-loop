import React, { useContext } from "react";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { st, classes } from "./header.st.css";

export const Header = ({ className }: ComponentProps): JSX.Element => {
	const { siteTitle, siteSubtitle } = useContext(ReactLocaleContext);
	// const logo = <img src="/favicon-temp.png" />;
	// const icon = <div className={classes.siteLogo}>x</div>;
	return (
		<header className={st(classes.root, className)}>
			<div className={classes.container}>
				<div className={classes.siteLogo}></div>
				<Button
					// icon={<div className={classes.siteLogo}>x</div>}
					// icon={logo as React.ReactElement}
					label={siteTitle}
					title={`${siteTitle} - ${siteSubtitle}`}
					link={"/"}
					callback={() => false}
					className={st(classes.siteTitle)}
				/>
				<div className={classes.siteSubtitle} aria-label={siteSubtitle}>
					{siteSubtitle}
				</div>
			</div>
		</header>
	);
};

export default Header;
