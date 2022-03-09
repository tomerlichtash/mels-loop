import React from "react";
import { Option } from "./option";
import { IOption } from "./option";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { style, classes } from "./dropdown.st.css";

export interface DropDownProps extends ComponentProps {
	options: IOption[];
	closeLabel: string;
	openLabel: string;
	optionListVisible?: boolean;
	onSelectChange?: (id: string) => void;
	triggerCallback?: (state: boolean) => void;
}

export const DropDown = ({
	options,
	openLabel,
	closeLabel,
	optionListVisible,
	onSelectChange,
	triggerCallback,
	className,
}: DropDownProps): JSX.Element => {
	return (
		<div
			className={style(classes.root, className)}
			onMouseLeave={() => triggerCallback(false)}
		>
			<Button
				className={style(classes.optionListTrigger, { optionListVisible })}
				callback={() => triggerCallback(!optionListVisible)}
				label={optionListVisible ? closeLabel : openLabel}
			/>
			{optionListVisible && (
				<ul className={classes.optionList}>
					{options.map((option) => {
						const { id, icon, label, isCurrent, targetPathname } = option;
						return (
							<li
								className={style(classes.option, { id, isCurrent }, className)}
							>
								<Option
									key={id}
									className={classes.option}
									closeDropDown={() => triggerCallback(false)}
									onSelectChange={onSelectChange}
									label={label}
									isCurrent={isCurrent}
									icon={icon}
									id={id}
									targetPathname={targetPathname}
								/>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default DropDown;
