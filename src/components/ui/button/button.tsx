import React from "react";
import Link from "next/link";
import { ComponentProps } from "../../../interfaces/models";

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
	...rest
}: ButtonProps): JSX.Element => {
	const btnLabel = title || label;
	const props = {
		title: btnLabel,
		"aria-label": btnLabel,
	};
	const btnContent = (
		<span className="content-wrapper" data-icon={!!icon} {...rest}>
			{icon && (
				<span className="icon" data-icon-side={iconSide}>
					<span className="img">{icon}</span>
				</span>
			)}
			<span className="content" data-add-icon-margin={!!icon}>
				{label && (
					<span className="label">
						<span className="text">{label}</span>
					</span>
				)}
				{children && <span className="children">{children}</span>}
			</span>
		</span>
	);

	if (!link && !target && !callback) {
		return (
			<span {...props} {...rest}>
				{btnContent}
			</span>
		);
	}

	if (link) {
		return (
			<Link href={link} passHref legacyBehavior>
				<a
					href={link}
					className={className}
					target={target}
					{...props}
					{...rest}
				>
					{btnContent}
				</a>
			</Link>
		);
	}

	return <span onClick={() => callback(id)}>{btnContent}</span>;
};

export default Button;
