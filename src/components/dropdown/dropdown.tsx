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
		openLabel,
		closeLabel,
		optionListVisible,
		onSelectChange,
		translate,
		triggerCallback,
		className,
	} = props;

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
							<Option
								key={id}
								className={style(classes.option, {
									current: isCurrent,
									id,
								})}
								closeDropDown={() => triggerCallback(false)}
								onSelectChange={onSelectChange}
								label={translate(label)}
								isCurrent={isCurrent}
								icon={icon}
								id={id}
								targetPathname={targetPathname}
							/>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default DropDown;
