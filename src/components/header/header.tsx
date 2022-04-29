import React, { useContext } from "react";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { st, classes } from "./header.st.css";

export interface HeaderProps extends ComponentProps {
	isHome: boolean;
}

export const Header = ({ isHome, className }: HeaderProps): JSX.Element => {
	const { siteTitle, siteSubtitle } = useContext(ReactLocaleContext);
	const logo = <img src="/favicon-temp.png" />;
	return (
		<header className={st(classes.root, className)}>
			<div className={classes.container}>
				<Button
					icon={logo as React.ReactElement}
					label={siteTitle}
					title={`${siteTitle} - ${siteSubtitle}`}
					link={isHome ? "" : "/"}
					callback={() => false}
					className={st(classes.siteTitle, { link: !isHome })}
				/>
				<div className={classes.siteSubtitle}>{siteSubtitle}</div>
			</div>
		</header>
	);
};

export default Header;
