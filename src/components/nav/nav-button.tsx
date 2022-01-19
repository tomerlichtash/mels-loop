import Link from "next/link";
import { SiteLocale } from "../../locales/pages";
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
		<Link href={`/${pageName}`}>
			<a
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
