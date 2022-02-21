import React from "react";
import Link from "next/link";
import { ComponentProps } from "../../../interfaces/models";
import { style, classes } from "./button.st.css";

export interface ButtonProps extends ComponentProps {
	label?: string;
	title?: string;
	icon?: string;
	link?: string;
	id?: string;
	selected?: boolean;
	callback?: (id: string) => void;
	className?: string;
}

export const Button = (props: ButtonProps): JSX.Element => {
	const { id, label, title, link, selected, callback, className } = props;

	if (link) {
		return (
			<Link href={`${link}`}>
				<a
					title={title || label}
					aria-label={title || label}
					className={style(classes.root, { selected }, className)}
				>
					{label}
				</a>
			</Link>
		);
	}

	return (
		<span
			title={title || label}
			aria-label={title || label}
			onClick={() => callback(id)}
			className={style(classes.root, { selected }, className)}
		>
			{label}
		</span>
	);
};

export default Button;
