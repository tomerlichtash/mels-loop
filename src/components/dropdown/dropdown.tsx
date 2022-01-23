import React, { useState } from "react";
import { Option } from "./option";
import { ILocaleRef } from "../../locales/types";
import { IOption } from "./option";
import { t } from "../../locales/translate";
import { ComponentProps } from "../../interfaces/models";
import { style, classes } from "./dropdown.st.css";

export interface DropDownProps extends ComponentProps {
	openLabel: string;
	closeLabel: string;
	options: IOption[];
	className?: string;
}

export const DropDown = (props: DropDownProps): JSX.Element => {
	const { locale, openLabel, closeLabel, options, className } = props;
	const [optionListVisible, toggleOptionList] = useState(false);
	return (
		<div
			className={style(classes.root, className)}
			onMouseLeave={() => toggleOptionList(false)}
		>
			<div className={classes.optionListTrigger}>
				{!optionListVisible ? (
					<div
						className={classes.optionListOpen}
						onClick={() => toggleOptionList(true)}
					>
						{t(openLabel, locale as ILocaleRef)}
					</div>
				) : (
					<div
						className={classes.optionListClose}
						onClick={() => toggleOptionList(false)}
					>
						{t(closeLabel, locale as ILocaleRef)}
					</div>
				)}
			</div>
			{optionListVisible && (
				<div className={classes.optionListContainer}>
					<ul className={classes.optionList}>
						{options.map((option) => (
							<Option
								key={option.id}
								locale={locale}
								closeDropDown={() => toggleOptionList(false)}
								{...option}
							/>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default DropDown;
