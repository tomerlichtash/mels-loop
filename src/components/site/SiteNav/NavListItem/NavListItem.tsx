import Link from "next/link";
import {
	FileIcon,
	ListBulletIcon,
	GitHubLogoIcon,
	Pencil1Icon,
} from "@radix-ui/react-icons";
import { Button } from "@components/ui";
import classNames from "classnames";
import styles from "./NavListItem.module.scss";

// type MenuItemLocale = {
// 	locale: {
// 		title?: string;
// 		author?: string;
// 		description?: string;
// 	};
// 	icon: string;
// 	url: string;
// 	target: string;
// };

const getIcon = (icon: string) => {
	switch (icon) {
		case "article":
			return <FileIcon />;
		case "list":
			return <ListBulletIcon />;
		case "github":
			return <GitHubLogoIcon />;
		case "pencil":
			return <Pencil1Icon />;
		default:
			return icon;
	}
};

const NavListItem = ({ onSelect, locale, icon, className, ...item }) => {
	const { title, author, description } = locale;
	return (
		<Button
			className={classNames(styles.root, className)}
			asChild
			onClick={onSelect}
		>
			<Link href={item.url} target={item.target}>
				<span className={classNames(styles.content)}>
					<span className={styles.icon}>{icon && getIcon(icon as string)}</span>
					<span>
						{title && (
							<span className={classNames(styles.itemTitle)}>{title}</span>
						)}
						{description && (
							<span className={styles.description}>{description}</span>
						)}
						{author && <span className={styles.author}>{author}</span>}
					</span>
				</span>
			</Link>
		</Button>
	);
};

export default NavListItem;
