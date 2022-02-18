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
	const { compKeys, options, translate, className } = props;
	// const { openLabel, closeLabel } = compKeys;
	const { openLabel, closeLabel } = props;
	const [optionListVisible, toggleOptionList] = useState(true);

	const openTrigger = (
		<div
			className={classes.optionListOpen}
			onClick={() => toggleOptionList(true)}
		>
			{translate(openLabel)}
		</div>
	);

	const closeTrigger = (
		<div
			className={classes.optionListClose}
			onClick={() => toggleOptionList(false)}
		>
			{translate(closeLabel)}
		</div>
	);

	return (
		<div
			className={style(classes.root, className)}
			onMouseLeave={() => toggleOptionList(false)}
		>
			<div className={classes.optionListTrigger}>
				{optionListVisible ? closeTrigger : openTrigger}
			</div>

			{optionListVisible && (
				<div className={classes.optionListContainer}>
					<ul className={classes.optionList}>
						{options.map((option) => (
							<Option
								key={option.id}
								className={style(classes.optionFromDropDown, {
									current: option.isCurrent,
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
