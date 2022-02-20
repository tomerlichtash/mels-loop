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
	const optionLabel = translate(label);
	if (isCurrent) {
		return (
			<li
				className={style(classes.root, className)}
				onClick={() => {
					closeDropDown();
				}}
			>
				<span
					title={optionLabel}
					aria-label={optionLabel}
					className={classes.optionContent}
				>
					{optionLabel}
				</span>
			</li>
		);
	}
	return (
		<li
			className={style(classes.root, className)}
			onClick={() => {
				closeDropDown();
				return callback(id);
			}}
		>
			{callback && (
				<span
					title={optionLabel}
					aria-label={optionLabel}
					className={classes.optionContent}
				>
					{optionLabel}
				</span>
			)}
			{targetPathname && (
				<Link href={`${targetPathname}`}>
					<a
						title={optionLabel}
						aria-label={optionLabel}
						className={style(classes.optionContent)}
					>
						{optionLabel}
					</a>
				</Link>
			)}
		</li>
	);
};

export default Option;
