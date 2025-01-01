import { getIcon } from 'components/icons';
import styles from './NavItem.module.scss';
import classNames from 'classnames';
import Link from 'components/link/Link';

type NavItemContentProps = {
	title: string;
	description: string;
	author: string;
	icon?: string;
	url?: string;
	target?: string;
	onClick?: () => void;
	className?: string;
};

const NavItemContent = ({
	url,
	target,
	icon,
	title,
	description,
	author,
	onClick,
	className,
}: NavItemContentProps) => (
	<Link
		href={url}
		target={target}
		className={classNames(styles.root, className)}
		asChild
		onClick={onClick}
	>
		<span className={classNames(styles.content, className)}>
			{icon && <span className={styles.icon}>{getIcon(icon)}</span>}
			<span className={styles.meta}>
				<span className={classNames(styles.title, className)}>{title}</span>
				<span className={styles.description}>{description}</span>
				<span className={styles.author}>{author}</span>
			</span>
		</span>
	</Link>
);

export default NavItemContent;
export type { NavItemContentProps };
