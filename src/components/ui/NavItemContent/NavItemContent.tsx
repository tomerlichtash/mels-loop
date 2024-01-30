import { getIcon } from "../NavListItem/helpers";
import styles from "./NavItemContent.module.scss";

const NavItemContent = ({ icon, title, description, author }) => {
	return (
		<span className={styles.root}>
			<span className={styles.icon}>{icon && getIcon(icon as string)}</span>
			<span>
				<span className={styles.title}>{title}</span>
				<span className={styles.description}>{description}</span>
				<span className={styles.author}>{author}</span>
			</span>
		</span>
	);
};

export default NavItemContent;
