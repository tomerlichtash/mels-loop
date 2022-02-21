import React from "react";
import Link from "next/link";
import { ComponentProps } from "../../../interfaces/models";
import { style, classes } from "./button.st.css";

export interface ButtonProps extends ComponentProps {
	label?: string;
	icon?: string;
	link?: string;
	id?: string;
	selected?: boolean;
	callback?: (id: string) => void;
	className?: string;
}

export const Button = (props: ButtonProps): JSX.Element => {
	const { id, label, link, selected, callback, className } = props;

	if (link) {
		return (
			<Link href={`${link}`}>
				<a
					title={label}
					aria-label={label}
					className={style(classes.root, { selected }, className)}
				>
					{label}
				</a>
			</Link>
		);
	}

	return (
		<span
			title={label}
			aria-label={label}
			onClick={() => callback(id)}
			className={style(classes.root, { selected }, className)}
		>
			{label}
		</span>
	);
};

export default Button;
