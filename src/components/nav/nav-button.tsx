import React from "react";
// import Link from "next/link";
import { Button } from "../ui";
import { ComponentProps } from "../../interfaces/models";
// import { style, classes } from "./nav-button.st.css";

export interface NavButtonProps extends ComponentProps {
	label: string;
	pageName: string;
	isCurrent: boolean;
}

export const NavButton = (props: NavButtonProps): JSX.Element => {
	const { pageName, label, isCurrent, className } = props;
	return (
		<Button
			link={pageName}
			label={label}
			className={className}
			selected={isCurrent}
		/>
	);
	// return (
	// 	<Link href={`${pageName}`}>
	// 		<a
	// 			title={label}
	// 			aria-label={label}
	// 			className={style(
	// 				classes.root,
	// 				{
	// 					current: isCurrent,
	// 				},
	// 				className
	// 			)}
	// 		>
	// 			{label}
	// 		</a>
	// 	</Link>
	// );
};

export default NavButton;
