import Link from "next/link";
import { useRouter } from "next/router";
import { classes } from "./locale-selector.st.css";

const LocaleLabels = {
	en: "English",
	he: "עברית",
};

export const LocaleSelector = (): JSX.Element => {
	const router = useRouter();
	const { locales } = router;
	const onSelectChange = (e) => {
		const locale = e.target.value;
		router.push(router.asPath, router.asPath, {
			locale,
			scroll: false,
		});
	};
	return (
		<>
			<select name="languages" id="language-select" onChange={onSelectChange}>
				{router.locales.map((language) => (
					<option value={language}>
						{language === "en"
							? "English"
							: language === "he"
							? "Hebrew"
							: null}
					</option>
				))}
			</select>
			{/* <ul className={classes.root}>
				{locales.map((locale) => (
					<li className={classes.optionContainer} key={locale}>
						<Link href={router.asPath} locale={locale}>
							<a className={classes.optionLabel}>{LocaleLabels[locale]}</a>
						</Link>
					</li>
				))}
			</ul> */}
		</>
	);
};

export default LocaleSelector;
