import { useRouter } from "next/router";
import { LOCALE_LABELS, LOCALE_SELECTOR_LOCALE } from "../../consts";
import { style, classes } from "./locale-selector.st.css";

export const LocaleSelector = ({
	className,
}: {
	className?: string;
}): JSX.Element => {
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
		<div className={style(classes.root, className)}>
			<select
				onChange={onSelectChange}
				className={classes.root}
				name="LocaleSelector"
				value={currentLocale}
				aria-label={LOCALE_SELECTOR_LOCALE.TITLE[currentLocale]}
			>
				{router.locales.map((language) => (
					<option
						value={language}
						aria-label={LOCALE_LABELS[language]}
						key={`langKey-${language}`}
						id={`langId-${language}`}
					>
						{LOCALE_LABELS[language]}
					</option>
				))}
			</select>
		</div>
	);
};

export default LocaleSelector;
