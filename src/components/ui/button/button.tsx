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
	if (!link && !target && !callback) {
		return (
			<span
				title={title || label}
				aria-label={title || label}
				className={st(classes.root, { selected }, className)}
			>
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
			</span>
		);
	}

	if (link) {
		return (
			<Link href={`${link}`}>
				<a
					title={title || label}
					aria-label={title || label}
					className={st(classes.root, { selected }, className)}
					target={target}
				>
					<span className={classes.content}>
						{icon && (
							<div className={classes.icon}>
								<span className={classes.img}>{icon}</span>
							</div>
						)}
						<span className={classes.label}>
							<span className={classes.text}>{label}</span>
						</span>
					</span>
				</a>
			</Link>
		);
	}

	return (
		<span
			title={title || label}
			aria-label={title || label}
			onClick={() => callback(id)}
			className={st(classes.root, { selected }, className)}
		>
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
		</span>
	);
};

export default Button;
