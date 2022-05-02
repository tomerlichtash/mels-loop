import React from "react";
import Link from "next/link";
import { ComponentProps } from "../../../interfaces/models";
import { st, classes } from "./button.st.css";

export interface ButtonProps extends ComponentProps {
	label?: string;
	title?: string;
	icon?: string | React.ReactElement;
	link?: string;
	id?: string;
	target?: string;
	selected?: boolean;
	callback?: (id: string) => void;
}

export const Button = ({
	id,
	label,
	icon,
	title,
	link,
	selected,
	target,
	callback,
	className,
}: ButtonProps): JSX.Element => {
	const btnLabel = title || label;
	const btnClassName = st(classes.root, { selected }, className);
	const btnProps = {
		title: btnLabel,
		"aria-label": btnLabel,
		className: btnClassName,
	};
	const btnContent = (
		<span className={classes.content}>
			{icon && (
				<span className={classes.icon}>
					<span className={classes.img}>{icon}</span>
				</span>
			)}
			<span className={classes.label}>
				<span className={classes.text}>{label}</span>
			</span>
		</span>
	);

	if (!link && !target && !callback) {
		return <span {...btnProps}>{btnContent}</span>;
	}

	if (link) {
		return (
			<Link href={`${link}`}>
				<a {...btnProps}>{btnContent}</a>
			</Link>
		);
	}

	return (
		<span onClick={() => callback(id)} {...btnProps}>
			{btnContent}
		</span>
	);
};

export default Button;
