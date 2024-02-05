import { Button } from '../button';
import styles from './VerticalMenuTrigger.module.scss';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import type { VerticalTriggerProps } from './types';

const VerticalMenuTrigger = ({ onClick }: VerticalTriggerProps) => {
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
