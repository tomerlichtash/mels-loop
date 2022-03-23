import React, { useState, useContext } from "react";
import DropDown from "../dropdown";
import { ComponentProps } from "../../interfaces/models";
import { IOption } from "../dropdown/option";
import { ReactLayoutContext } from "../../contexts/layout-context";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
// import { LANGS } from "../svg";
import { st, classes } from "./locale-selector.st.css";
import { Button } from "../ui";

export interface LocaleSelectorProps extends ComponentProps {
	options: IOption[];
	onLocaleChange: (localeId: string) => void;
}

export const LocaleSelector = ({
	compKeys,
	options,
	onLocaleChange,
	className,
}: LocaleSelectorProps): JSX.Element => {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate, locale } = layoutContext;
	const [optionListVisible, toggleOptionList] = useState(false);

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
			<ToggleGroup.Root
				type="single"
				// value={"en"}
				// defaultValue={"en"}
				onValueChange={(localeId) => {
					console.log(localeId);
					onLocaleChange(localeId);
				}}
			>
				<ul className={classes.list}>
					<ToggleGroup.Item tabIndex={1} asChild title="EN" value="en">
						<li className={st(classes.item, { selected: locale === "en" })}>
							<Button label="EN" callback={() => false} />
						</li>
					</ToggleGroup.Item>
					<ToggleGroup.Item tabIndex={2} asChild title="HE" value="he">
						<li className={st(classes.item, { selected: locale === "he" })}>
							<Button label="ע" callback={() => false} />
						</li>
					</ToggleGroup.Item>
				</ul>
			</ToggleGroup.Root>

			{/* <div className={classes.langsIcon}>{LANGS}</div> */}
			{/* <div className={classes.dropDownContainer}> */}
			{/* <DropDown
					className={st(classes.dropdown, "locator-locale-select")}
					options={options.map((option) =>
						Object.assign({}, option, { label: translate(option.label) })
					)}
					compKeys={compKeys}
					optionListVisible={optionListVisible}
					triggerCallback={toggleOptionList}
				/> */}
			{/* </div> */}
		</div>
	);
};

export default LocaleSelector;
