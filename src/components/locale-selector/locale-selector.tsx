import React from "react";
import { useRouter } from "next/router";
import DropDown from "../dropdown";
import { t } from "../../locales/translate";
import { style, classes } from "./locale-selector.st.css";

export const LocaleSelector = ({
	className,
}: {
	className?: string;
}): JSX.Element => {
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
						label: "LOCALE_LABEL_EN",
						isCurrent: currentLocale === "en",
						callback: onSelectChange,
					},
					{
						id: "he",
						label: "LOCALE_LABEL_HE",
						isCurrent: currentLocale === "he",
						callback: onSelectChange,
					},
				]}
				openLabel={"LOCALE_SELECTOR_TITLE"}
				closeLabel={"LOCALE_SELECTOR_CLOSE"}
			/>
			{/* </div> */}
			<div className={classes.current}>
				[{t(`LOCALE_LABEL_${currentLocale.toUpperCase()}`, currentLocale)}]
			</div>
		</div>
	);
};

export default LocaleSelector;
