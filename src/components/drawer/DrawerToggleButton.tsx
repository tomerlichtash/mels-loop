import { Button } from '../button';
import styles from './VerticalMenuTrigger.module.scss';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

type VerticalMenuProps = {
	onClick: () => void;
};

const VerticalMenuTrigger = ({ onClick }: VerticalMenuProps) => {
	return (
		<Button onClick={onClick} asChild>
			<span className={styles.root}>
				<span className={styles.label}>Menu</span>
				<span className={styles.icon}>
					<HamburgerMenuIcon />
				</span>
			</span>
		</Button>
	);
};

export default VerticalMenuTrigger;
