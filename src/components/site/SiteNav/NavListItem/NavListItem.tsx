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
import classNames from "classnames";

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
		<Link
			className={classNames(styles.root, className)}
			href={item.url}
			target={item.target}
		>
			<span className={styles.content}>
				<span className={styles.icon}>{icon && getIcon(icon as string)}</span>

				<span>
					{title && <span className={styles.title}>{title}</span>}
					{description && (
						<span className={styles.description}>{description}</span>
					)}
					{author && <span className={styles.author}>{author}</span>}
				</span>
			</span>
		</Link>
	);
};

export default NavListItem;
