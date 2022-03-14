import React from "react";
import { Option } from "./option";
import { IOption } from "./option";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { DROPDOWN_ARROW } from "../svg";
import { st, classes } from "./dropdown.st.css";

export interface DropDownProps extends ComponentProps {
	options: IOption[];
	optionListVisible?: boolean;
	onSelectChange?: (id: string) => void;
	triggerCallback?: (state: boolean) => void;
}

export const DropDown = ({
	options,
	optionListVisible,
	onSelectChange,
	triggerCallback,
	className,
}: DropDownProps): JSX.Element => {
	const currentOption = options.filter((opt) => opt.isCurrent)[0];
	return (
		<div
			className={st(classes.root, { optionListVisible }, className)}
			onMouseLeave={() => triggerCallback(false)}
			onClick={() => triggerCallback(!optionListVisible)}
		>
			<div className={st(classes.triggerContainer, { optionListVisible })}>
				<span
					className={classes.triggerIcon}
					onClick={() => triggerCallback(!optionListVisible)}
				>
					{DROPDOWN_ARROW}
				</span>
				<Button
					className={st(classes.triggerButton, "trigger-button")}
					callback={() => triggerCallback(!optionListVisible)}
					label={currentOption.label}
					icon={currentOption.icon}
				/>
			</div>
			{
				<div className={classes.optionList}>
					{optionListVisible &&
						options
							.filter((option) => !option.isCurrent)
							.map((option) => {
								const { id, icon, label, isCurrent, targetPathname } = option;
								return (
									<Option
										key={`dropdown-option-${id}`}
										className={st(
											classes.option,
											{ isCurrent, id },
											`locator-option-id-${id}`
										)}
										closeDropDown={() => triggerCallback(false)}
										onSelectChange={onSelectChange}
										label={label}
										isCurrent={isCurrent}
										icon={icon}
										id={id}
										targetPathname={targetPathname}
									/>
								);
							})}
				</div>
			}
		</div>
	);
};

export default DropDown;
