import { useRouter } from "next/router";
import { t } from "../../locales/translate";
import { classes } from "./footer.st.css";

export const Footer = (): JSX.Element => {
	const router = useRouter();
	const { locale } = router;
	return (
		<footer className={classes.root}>
			<div className={classes.license}>
				2021-{`${new Date().getFullYear()}`} (cc-by) {t("SITE_NAME", locale)}
			</div>
		</footer>
	);
};

export default Footer;
