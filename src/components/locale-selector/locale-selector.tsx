import Link from "next/link";
import { useRouter } from "next/router";
import { classes } from "./locale-selector.st.css";

// todo: move to types enum
const LocaleLabels = {
	en: "English",
	he: "עברית",
};

export const LocaleSelector = (): JSX.Element => {
	const router = useRouter();
	const currentLocale = router.locale;
	const onSelectChange = (e) => {
		const locale = e.target.value;
		router.push(router.asPath, router.asPath, {
			locale,
			scroll: false,
		});
	};
	return (
		<select onChange={onSelectChange}>
			{router.locales.map((language) => (
				<option value={language} selected={currentLocale === language}>
					{LocaleLabels[language]}
				</option>
			))}
		</select>
	);
};

export default LocaleSelector;
