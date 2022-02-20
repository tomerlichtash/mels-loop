import React, { useState } from "react";
import { Option } from "./option";
import { IOption } from "./option";
import { ComponentProps } from "../../interfaces/models";
import { style, classes } from "./dropdown.st.css";

export interface DropDownProps extends ComponentProps {
	options: IOption[];
	closeLabel: string;
	openLabel: string;
}

export const DropDown = (props: DropDownProps): JSX.Element => {
	const { options, translate, className } = props;
	const { openLabel, closeLabel } = props;
	const [optionListVisible, toggleOptionList] = useState(false);

	const dropDownTrigger = (label: string) => {
		return (
			<div
				className={classes.optionListOpen}
				onClick={() => toggleOptionList(!optionListVisible)}
			>
				{label}
			</div>
		);
	};

	return (
		<div
			className={style(classes.root, className)}
			onMouseLeave={() => toggleOptionList(false)}
		>
			<div className={style(classes.optionListTrigger, { optionListVisible })}>
				{dropDownTrigger(optionListVisible ? closeLabel : openLabel)}
			</div>

			{optionListVisible && (
				<div className={classes.optionListContainer}>
					<ul className={classes.optionList}>
						{options.map((option) => (
							<Option
								key={option.id}
								className={style(classes.optionFromDropDown, {
									current: option.isCurrent,
									id: option.id,
								})}
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
