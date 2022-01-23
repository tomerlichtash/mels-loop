import { t } from "../../locales/translate";
import { FOOTER_LOCALE } from "../../locales/components";
import { ILocaleRef } from "../../locales/types";
import { classes } from "./footer.st.css";

export const Footer = ({ locale }: { locale: ILocaleRef }): JSX.Element => {
	return (
		<footer className={classes.root}>
			<div className={classes.license}>
				2021-{`${new Date().getFullYear()}`} (${FOOTER_LOCALE.license}){" "}
				{t(FOOTER_LOCALE.siteName, locale)}
			</div>
		</footer>
	);
};

export default Footer;
