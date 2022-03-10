import React, { useState, useContext } from "react";
import DropDown from "../dropdown";
import { ComponentProps } from "../../interfaces/models";
import { IOption } from "../dropdown/option";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { LANGS } from "../svg";
import { st, classes } from "./locale-selector.st.css";

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
	const { translate, locale } = layoutContext;
	// const [optionListVisible, toggleOptionList] = useState(false);
	const [optionListVisible, toggleOptionList] = useState(true);
	return (
		<div
			className={st(
				classes.root,
				{ locale, isOpen: optionListVisible },
				className
			)}
			title={"Select Language"}
			aria-label={"Select Language"}
		>
			<div className={classes.langsIcon}>{LANGS}</div>
			<div className={classes.dropDownContainer}>
				<DropDown
					className={st(classes.dropdown, "locator-locale-select")}
					options={options.map((option) =>
						Object.assign({}, option, { label: translate(option.label) })
					)}
					compKeys={compKeys}
					optionListVisible={optionListVisible}
					triggerCallback={toggleOptionList}
					onSelectChange={onSelectChange}
				/>
			</div>
		</div>
	);
};

export default LocaleSelector;
