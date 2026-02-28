import { useTranslation } from '@mels-loop/i18n/client';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import styles from './BurgerButton.module.css';

interface BurgerButtonProps {
	onClick: () => void;
}

export function BurgerButton({ onClick }: BurgerButtonProps) {
	const { t } = useTranslation();
	return (
		<button
			type="button"
			className={styles.root}
			onClick={onClick}
			aria-label={t('nav.toggleMenu')}
		>
			<HamburgerMenuIcon width={20} height={20} />
		</button>
	);
}
