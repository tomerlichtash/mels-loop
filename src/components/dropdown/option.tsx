import React from "react";
import { Button } from "../ui";
import { ComponentProps } from "../../interfaces/models";
import { style, classes } from "./option.st.css";
import IconComp from "../../assets/svg/source_icons_computer.svg";

export interface IOption extends ComponentProps {
	id: string;
	label: string;
	icon?: string;
	targetPathname?: string;
	isCurrent?: boolean;
	onSelectChange: (id: string) => void;
	closeDropDown?: () => void;
}

export const Option = (props: IOption): JSX.Element => {
	const {
		id,
		targetPathname,
		label,
		isCurrent,
		icon,
		onSelectChange,
		closeDropDown,
		className,
	} = props;

	if (isCurrent) {
		return (
			<li className={style(classes.root, { id }, className)}>
				<Button
					label={label}
					icon={icon}
					className={classes.optionButton}
					callback={closeDropDown}
				/>{" "}
			</li>
		);
	}

	if (targetPathname && !onSelectChange) {
		return (
			<li className={style(classes.root, { id }, className)}>
				<Button
					label={label}
					id={id}
					icon={icon}
					callback={closeDropDown}
					link={targetPathname}
					className={classes.button}
				/>
			</li>
		);
	}

	return (
		<li className={style(classes.root, { id }, className)}>
			<Button
				label={label}
				id={id}
				icon={icon}
				callback={() => {
					closeDropDown();
					return onSelectChange(id);
				}}
				className={classes.optionButton}
			/>
		</li>
	);
};

export default Option;
