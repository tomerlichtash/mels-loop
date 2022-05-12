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
	iconSide?: "right" | "left";
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
	iconSide,
	callback,
	className,
	children,
}: ButtonProps): JSX.Element => {
	const btnLabel = title || label;
	const btnClassName = st(classes.root, { selected }, classes.aTag, className);
	const props = {
		title: btnLabel,
		"aria-label": btnLabel,
		className: btnClassName,
	};
	const btnContent = (
		<span className={classes.contentWrapper}>
			{icon && (
				<span className={st(classes.icon, { side: iconSide })}>
					<span className={classes.img}>{icon}</span>
				</span>
			)}
			<span className={st(classes.content, { addIconMargin: !!icon })}>
				{label && (
					<span className={classes.label}>
						<span className={classes.text}>{label}</span>
					</span>
				)}
				{children && <span className={classes.children}>{children}</span>}
			</span>
		</span>
	);

	if (!link && !target && !callback) {
		return <span {...props}>{btnContent}</span>;
	}

	if (link) {
		return (
			<Link href={link}>
				<a {...props}>{btnContent}</a>
			</Link>
		);
	}

	return (
		<span onClick={() => callback(id)} {...props}>
			{btnContent}
		</span>
	);
};

export default Button;
