import React from "react";
import { Option } from "./option";
import { IOption } from "./option";
import { ComponentProps } from "../../interfaces/models";
import { style, classes } from "./dropdown.st.css";
import { Button } from "../ui";

export interface DropDownProps extends ComponentProps {
	options: IOption[];
	closeLabel: string;
	openLabel: string;
	optionListVisible?: boolean;
	onSelectChange?: (id: string) => void;
	triggerCallback?: (state: boolean) => void;
}

export const DropDown = (props: DropDownProps): JSX.Element => {
	const {
		options,
		onSelectChange,
		translate,
		triggerCallback,
		optionListVisible,
		className,
	} = props;
	const { openLabel, closeLabel } = props;

	return (
		<div
			className={style(classes.root, className)}
			onMouseLeave={() => triggerCallback(false)}
		>
			<div className={style(classes.optionListTrigger, { optionListVisible })}>
				<Button
					className={classes.optionListOpen}
					callback={() => triggerCallback(!optionListVisible)}
					label={optionListVisible ? closeLabel : openLabel}
				/>
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
								closeDropDown={() => triggerCallback(false)}
								onSelectChange={onSelectChange}
								label={translate(option.label)}
								isCurrent={option.isCurrent}
								id={option.id}
								targetPathname={option.targetPathname}
								// translate={translate}
								// {...option}
							/>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default DropDown;
