import React from "react";
import DropDown from "../dropdown";
import { style, classes } from "./locale-selector.st.css";
import { ComponentProps } from "../../interfaces/models";
import { LOCALE_SELECTOR_LOCALE } from "../../locales/components";

export interface LocaleSelectorProps extends ComponentProps {
	onSelectChange: (locale: string) => void;
	className?: string;
}

export const LocaleSelector = (props: LocaleSelectorProps): JSX.Element => {
	const { locale, compKeys, className, onSelectChange, translate } = props;
	const currentLocaleLabel = `LOCALE_LABEL_${locale.toUpperCase()}`;
	return (
		<div className={style(classes.root, className)}>
			<DropDown
				className={style(classes.select)}
				options={[
					{
						id: "en",
						label: compKeys.en,
						isCurrent: locale === "en",
						callback: onSelectChange,
					},
					{
						id: "he",
						label: compKeys.he,
						isCurrent: locale === "he",
						callback: onSelectChange,
					},
				]}
				compKeys={LOCALE_SELECTOR_LOCALE}
				translate={translate}
			/>
			<div className={classes.current}>[{translate(currentLocaleLabel)}]</div>
		</div>
	);
};

export default LocaleSelector;
