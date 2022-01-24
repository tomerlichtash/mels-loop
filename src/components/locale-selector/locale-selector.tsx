import React from "react";
import DropDown from "../dropdown";
import { style, classes } from "./locale-selector.st.css";
import { ComponentProps } from "../../interfaces/models";
import { IOption } from "../dropdown/option";

export interface LocaleSelectorProps extends ComponentProps {
	currentLocaleLabel: string;
	options: IOption[];
}

export const LocaleSelector = (props: LocaleSelectorProps): JSX.Element => {
	const { compKeys, options, currentLocaleLabel, translate, className } = props;
	return (
		<div className={style(classes.root, className)}>
			<DropDown
				className={style(classes.select)}
				options={options}
				compKeys={compKeys}
				translate={translate}
			/>
			<div className={classes.current}>[{translate(currentLocaleLabel)}]</div>
		</div>
	);
};

export default LocaleSelector;
