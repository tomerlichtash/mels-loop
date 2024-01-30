import Link from "next/link";
import { Button } from "@components/ui";
import classNames from "classnames";
import styles from "./NavListItem.module.scss";

type NavListItem = {
	children: React.ReactNode[];
	url: string;
	target: string;
	onClick: () => void;
	className?: string;
};

const NavListItem = ({
	children,
	url,
	target,
	className,
	onClick,
}: NavListItem) => {
	return (
		<Button
			className={classNames(styles.root, className)}
			onClick={onClick}
			asChild
		>
			<Link href={url} target={target}>
				<span className={classNames(styles.content)}>{children}</span>
			</Link>
		</Button>
	);
};

export default NavListItem;
