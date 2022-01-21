import Link from "next/link";
import { style, classes } from "./nav-button.st.css";

export const NavButton = ({
	label,
	pageName,
	isCurrent,
	className,
}: {
	label: string;
	pageName: string;
	isCurrent: boolean;
	className?: string;
}): JSX.Element => {
	return (
		<Link href={`${pageName}`}>
			<a
				title={label}
				aria-label={label}
				className={style(
					classes.root,
					{
						current: isCurrent,
					},
					className
				)}
			>
				{label}
			</a>
		</Link>
	);
};

export default NavButton;
