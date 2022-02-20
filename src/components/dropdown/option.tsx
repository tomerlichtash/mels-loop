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
	className?: string;
}

export const Option = (props: IOption): JSX.Element => {
	const {
		id,
		targetPathname,
		label,
		isCurrent,
		translate,
		callback,
		closeDropDown,
		className,
	} = props;
	return (
		<li className={style(classes.root, { current: isCurrent, id }, className)}>
			{callback && (
				<span
					title={label}
					aria-label={label}
					onClick={() => {
						closeDropDown();
						return callback(id);
					}}
					className={style(classes.optionContent)}
				>
					{translate(label)}
				</span>
			)}
			{targetPathname && (
				<Link href={`${targetPathname}`}>
					<a
						title={label}
						aria-label={label}
						className={style(classes.optionContent)}
					>
						{translate(label)}
					</a>
				</Link>
			)}
		</li>
	);
};

export default Option;
