import React, { useContext } from "react";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { st, classes } from "./header.st.css";

export interface IHeaderProps extends ComponentProps {
	siteNameTestId?: string;
}

export const Header = ({ className, siteNameTestId }: IHeaderProps): JSX.Element => {
	const { siteTitle, siteSubtitle, textDirection } =
		useContext(ReactLocaleContext);
	return (
		<header className={st(classes.root, { textDirection }, className)}>
			<div className={classes.container}>
				<Button
					icon={<div className={classes.siteLogo}></div>}
					label={siteTitle}
					title={`${siteTitle} - ${siteSubtitle}`}
					link={"/"}
					callback={() => false}
					className={classes.siteTitle}
					testId={siteNameTestId}
				/>
				<div className={classes.siteSubtitle} aria-label={siteSubtitle}>
					{siteSubtitle}
				</div>
			</div>
		</header>
	);
};

export default Header;
