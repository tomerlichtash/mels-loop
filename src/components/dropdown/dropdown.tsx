import React, { useState } from "react";
import { Option } from "./option";
import { IOption } from "./option";
import { ComponentProps } from "../../interfaces/models";
import { style, classes } from "./dropdown.st.css";

export interface DropDownProps extends ComponentProps {
	options: IOption[];
	className?: string;
}

export const DropDown = (props: DropDownProps): JSX.Element => {
	const { locale, compKeys, options, translate, className } = props;
	const { openLabel, closeLabel } = compKeys;
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
						{translate(openLabel)}
					</div>
				) : (
					<div
						className={classes.optionListClose}
						onClick={() => toggleOptionList(false)}
					>
						{translate(closeLabel)}
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
								translate={translate}
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
