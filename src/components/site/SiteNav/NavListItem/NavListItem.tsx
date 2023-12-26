import classNames from "classnames";
import Link from "next/link";
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

import {
	FileIcon,
	ListBulletIcon,
	TwitterLogoIcon,
	GitHubLogoIcon,
	Pencil1Icon,
} from "@radix-ui/react-icons";

const getIcon = (icon: string) => {
	switch (icon) {
		case "article":
			return <FileIcon />;
		case "list":
			return <ListBulletIcon />;
		case "twitter":
			return <TwitterLogoIcon />;
		case "github":
			return <GitHubLogoIcon />;
		case "pencil":
			return <Pencil1Icon />;
		default:
			break;
	}
};

const NavListItem = ({ locale, icon, className, ...item }) => {
	const { title, author, description } = locale;
	return (
		<li className={classNames(styles.root)}>
			<Link className={styles.link} href={item.url} target={item.target}>
				{title && <span className={styles.listItemTitle}>{title}</span>}
				{description && (
					<span className={styles.listItemText}>{description}</span>
				)}
				{author && <span className={styles.listItemAuthor}>{author}</span>}
				{icon && getIcon(icon as string)}
			</Link>
		</li>
	);
};

export default NavListItem;
