import React, { useContext } from "react";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { st, classes } from "./header.st.css";

export interface HeaderProps extends ComponentProps {
	isHome: boolean;
}

export const Header = ({
	isHome,
	compKeys,
	className,
}: HeaderProps): JSX.Element => {
	const { translate } = useContext(ReactLocaleContext);
	const { siteTitle, siteSubtitle } = compKeys;
	const title = translate(siteTitle);
	const subtitle = translate(siteSubtitle);
	const fullTitle = `${title} - ${subtitle}`;
	const logo = <img src="/favicon-temp.png" />;
	return (
		<header className={st(classes.root, className)}>
			<div className={classes.container}>
				<Button
					icon={logo as React.ReactElement}
					label={title}
					title={fullTitle}
					link={isHome ? "" : "/"}
					callback={() => false}
					className={classes.siteTitle}
				/>
				<div className={classes.siteSubtitle}>{subtitle}</div>
			</div>
		</header>
	);
};

export default Header;
