import { getIcon } from '../nav-item/helpers';
import styles from './NavItemContent.module.scss';

export type NavItemContentProps = {
	title: string;
	description: string;
	author: string;
	icon?: string;
};

const NavItemContent = ({
	icon,
	title,
	description,
	author,
}: NavItemContentProps) => (
	<span className={styles.root}>
		{icon && <span className={styles.icon}>{getIcon(icon)}</span>}
		<span>
			<span className={styles.title}>{title}</span>
			<span className={styles.description}>{description}</span>
			<span className={styles.author}>{author}</span>
		</span>
	</span>
);

export default NavItemContent;
