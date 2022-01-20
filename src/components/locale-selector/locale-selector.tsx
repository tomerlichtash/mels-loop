import { useRouter } from "next/router";
import { LOCALE_LABELS } from "../../consts";
import { classes } from "./locale-selector.st.css";

export const LocaleSelector = (): JSX.Element => {
	const router = useRouter();
	const currentLocale = router.locale;

	const onSelectChange = (e) => {
		const locale = e.target.value;
		return router.push(router.asPath, router.asPath, {
			locale,
			scroll: false,
		});
	};

	return (
		<select
			onChange={onSelectChange}
			className={classes.root}
			name="LocaleSelector"
			value={currentLocale}
		>
			{router.locales.map((language) => (
				<option
					value={language}
					key={`langKey-${language}`}
					id={`langId-${language}`}
				>
					{LOCALE_LABELS[language]}
				</option>
			))}
		</select>
	);
};

export default LocaleSelector;
