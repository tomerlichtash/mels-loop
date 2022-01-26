import React from "react";
import Link from "next/link";
import { ComponentProps } from "../../interfaces/models";
import { style, classes } from "./option.st.css";

export interface IOption extends ComponentProps {
	id: string;
	label: string;
	targetPathname?: string;
	isCurrent?: boolean;
	callback?: (id: string) => void;
	closeDropDown?: () => void;
}

export const Option = (props: IOption): JSX.Element => {
	const {
		id,
		targetPathname,
		label,
		isCurrent,
		className,
		translate,
		callback,
		closeDropDown,
	} = props;
	return (
		<li className={classes.root}>
			{callback && (
				<span
					title={label}
					aria-label={label}
					onClick={() => {
						closeDropDown();
						return callback(id);
					}}
					className={style(
						classes.optionContent,
						{
							current: isCurrent,
						},
						className
					)}
				>
					{translate(label)}
				</span>
			)}
			{targetPathname && (
				<Link href={`${targetPathname}`}>
					<a
						title={label}
						aria-label={label}
						className={style(
							classes.optionContent,
							{
								current: isCurrent,
							},
							className
						)}
					>
						{translate(label)}
					</a>
				</Link>
			)}
		</li>
	);
};

export default Option;
