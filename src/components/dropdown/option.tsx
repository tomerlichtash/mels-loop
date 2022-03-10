import React from "react";
import { Button } from "../ui";
import { ComponentProps } from "../../interfaces/models";
import { st, classes } from "./option.st.css";

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

	const getOptionContent = () => {
		let optionContent = (
			<Button
				label={label}
				id={id}
				icon={icon}
				callback={() => {
					closeDropDown();
					return onSelectChange(id);
				}}
				className={classes.button}
			/>
		);

		if (isCurrent) {
			optionContent = (
				<Button
					label={label}
					icon={icon}
					callback={closeDropDown}
					className={classes.button}
				/>
			);
		}

		if (targetPathname && !onSelectChange) {
			optionContent = (
				<Button
					label={label}
					id={id}
					icon={icon}
					callback={closeDropDown}
					link={targetPathname}
					className={classes.button}
				/>
			);
		}

		return optionContent;
	};

	return (
		<span className={st(classes.root, className)}>{getOptionContent()}</span>
	);
};

export default Option;
