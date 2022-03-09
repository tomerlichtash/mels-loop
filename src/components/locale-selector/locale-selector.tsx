import React, { useState, useContext } from "react";
import DropDown from "../dropdown";
import { ComponentProps } from "../../interfaces/models";
import { IOption } from "../dropdown/option";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { style, classes } from "./locale-selector.st.css";

export interface LocaleSelectorProps extends ComponentProps {
	options: IOption[];
	onSelectChange: (locale: string) => void;
}

export const LocaleSelector = ({
	compKeys,
	options,
	onSelectChange,
	className,
}: LocaleSelectorProps): JSX.Element => {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate } = layoutContext;
	const [optionListVisible, toggleOptionList] = useState(false);
	const currentLang = options.find((option) => option.isCurrent).label;
	return (
		<div className={style(classes.root, className)}>
			<div className={classes.dropDownContainer}>
				<DropDown
					className={style(classes.localeDropDown, "locator-locale-selector")}
					options={options.map((option) =>
						Object.assign({}, option, { label: translate(option.label) })
					)}
					compKeys={compKeys}
					optionListVisible={optionListVisible}
					triggerCallback={toggleOptionList}
					onSelectChange={onSelectChange}
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
