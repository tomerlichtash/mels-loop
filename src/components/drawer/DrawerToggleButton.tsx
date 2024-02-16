import classNames from 'classnames';
import Button from '../button/Button';
import styles from './VerticalMenuTrigger.module.scss';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

type DrawerToggleButtonProps = {
	onClick: () => void;
	className?: string;
};

const DrawerToggleButton = ({
	onClick,
	className,
}: DrawerToggleButtonProps) => {
	return (
		<Button onClick={onClick} asChild>
			<span className={classNames(styles.root, className)}>
				<span className={styles.label}>Menu</span>
				<span className={styles.icon}>
					<HamburgerMenuIcon />
				</span>
			</span>
		</Button>
	);
};

export default DrawerToggleButton;
export type { DrawerToggleButtonProps };
