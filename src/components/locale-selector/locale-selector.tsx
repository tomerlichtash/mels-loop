import React from "react";
import DropDown from "../dropdown";
import { style, classes } from "./locale-selector.st.css";
import { ComponentProps } from "../../interfaces/models";
import { IOption } from "../dropdown/option";

export interface LocaleSelectorProps extends ComponentProps {
	// currentLocaleLabel: string;
	options: IOption[];
}

export const LocaleSelector = (props: LocaleSelectorProps): JSX.Element => {
	const { compKeys, options, translate, className } = props;
	return (
		<div className={style(classes.root, className)}>
			<div className={classes.dropDownContainer}>
				<DropDown
					className={style(classes.localeDropDown)}
					options={options}
					compKeys={compKeys}
					translate={translate}
					openLabel={options.find((d) => d.isCurrent).label}
					closeLabel={"LOCALE_SELECTOR_CLOSE"}
				/>
			</div>
		</div>
	);
};

export default LocaleSelector;
