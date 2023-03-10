import React, { useContext } from "react";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { ReactLocaleContext } from "../../contexts/locale-context";

export const Header = ({ className }: ComponentProps): JSX.Element => {
	const { siteTitle, siteSubtitle, textDirection } =
		useContext(ReactLocaleContext);
	return (
		<header className="header">
			<div className="container">
				<Button
					icon={<div className="site-logo"></div>}
					label={siteTitle}
					title={`${siteTitle} - ${siteSubtitle}`}
					link={"/"}
					callback={() => false}
					className="site-title"
				/>
				<div className="site-subtitle" aria-label={siteSubtitle}>
					{siteSubtitle}
				</div>
			</div>
		</header>
	);
};

export default Header;
