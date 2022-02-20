import React, { useState } from "react";
import DropDown from "../dropdown";
import { style, classes } from "./locale-selector.st.css";
import { ComponentProps } from "../../interfaces/models";
import { IOption } from "../dropdown/option";

export interface LocaleSelectorProps extends ComponentProps {
	options: IOption[];
}

export const LocaleSelector = (props: LocaleSelectorProps): JSX.Element => {
	const [optionListVisible, toggleOptionList] = useState(false);
	const { compKeys, options, translate, className } = props;
	const currentLang = options.find((d) => d.isCurrent).label;
	return (
		<div className={style(classes.root, className)}>
			<div className={classes.dropDownContainer}>
				<DropDown
					className={style(classes.localeDropDown)}
					options={options}
					compKeys={compKeys}
					triggerCallback={toggleOptionList}
					optionListVisible={optionListVisible}
					translate={translate}
					openLabel={`${translate(
						"LOCALE_SELECTOR_LANGUAGE_LABEL"
					)}: ${translate(currentLang)}`}
					closeLabel={`${translate("LOCALE_SELECTOR_CLOSE")}`}
				/>
			</div>
		</div>
	);
};

export default LocaleSelector;
