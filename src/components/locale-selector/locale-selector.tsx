import React from "react";
import { useRouter } from "next/router";
import DropDown from "../dropdown";
import { t } from "../../locales/translate";
import { style, classes } from "./locale-selector.st.css";
import { ILocaleRef } from "../../locales/types";

export interface LocaleSelectorProps {
	locale: ILocaleRef;
	className?: string;
}

export const LocaleSelector = (props: LocaleSelectorProps): JSX.Element => {
	const { locale, className } = props;

	const router = useRouter();
	const currentLocale = router.locale;
	const onSelectChange = (locale: string) => {
		return router.push(router.asPath, router.asPath, {
			locale,
			scroll: false,
		});
	};

	return (
		<div className={style(classes.root, className)}>
			{/* <div className={style(classes.select)}> */}
			<DropDown
				className={style(classes.select)}
				options={[
					{
						id: "en",
						locale: "en",
						label: "LOCALE_LABEL_EN",
						isCurrent: currentLocale === "en",
						callback: onSelectChange,
					},
					{
						id: "he",
						locale: "he",
						label: "LOCALE_LABEL_HE",
						isCurrent: currentLocale === "he",
						callback: onSelectChange,
					},
				]}
				openLabel={"LOCALE_SELECTOR_TITLE"}
				closeLabel={"LOCALE_SELECTOR_CLOSE"}
				locale={locale}
			/>
			{/* </div> */}
			<div className={classes.current}>
				[{t(`LOCALE_LABEL_${currentLocale.toUpperCase()}`, currentLocale)}]
			</div>
		</div>
	);
};

export default LocaleSelector;
