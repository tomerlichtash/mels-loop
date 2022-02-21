import React from "react";
import { Button } from "../ui";
import { ComponentProps } from "../../interfaces/models";
import { style, classes } from "./option.st.css";

export interface IOption extends ComponentProps {
	id: string;
	label: string;
	targetPathname?: string;
	isCurrent?: boolean;
	onSelectChange: (id: string) => void;
	closeDropDown?: () => void;
	className?: string;
}

export const Option = (props: IOption): JSX.Element => {
	const {
		id,
		targetPathname,
		label,
		isCurrent,
		onSelectChange,
		closeDropDown,
		className,
	} = props;

	if (isCurrent) {
		return (
			<li className={style(classes.root, className)}>
				<Button
					label={label}
					className={classes.optionContent}
					callback={closeDropDown}
				/>
			</li>
		);
	}

	if (targetPathname && !onSelectChange) {
		return (
			<li className={style(classes.root, className)}>
				<Button
					label={label}
					id={id}
					callback={() => closeDropDown()}
					link={targetPathname}
					className={classes.optionContent}
				/>
			</li>
		);
	}

	return (
		<li className={style(classes.root, className)}>
			<Button
				label={label}
				id={id}
				callback={() => {
					closeDropDown();
					return onSelectChange(id);
				}}
				className={classes.optionContent}
			/>
		</li>
	);
};

export default Option;
