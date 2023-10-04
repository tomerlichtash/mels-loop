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
	onClick?: (id: string) => void;
}

const Button = ({
	id,
	label,
	icon,
	title,
	link,
	selected,
	target,
	iconSide,
	className,
	children,
	onClick,
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

	if (!link && !target && !onClick) {
		return (
			<span {...props} {...rest} data-selected={selected}>
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
					data-selected={selected}
					{...props}
					{...rest}
				>
					{btnContent}
				</a>
			</Link>
		);
	}

	return (
		<span
			onClick={() => onClick(id)}
			data-selected={selected}
			className={className}
		>
			{btnContent}
		</span>
	);
};

export default Button;
