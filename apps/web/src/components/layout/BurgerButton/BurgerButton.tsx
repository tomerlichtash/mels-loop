import { useTranslation } from '@mels-loop/i18n/client';
import { ListIcon } from '@phosphor-icons/react/ssr';

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
			<ListIcon size={20} />
		</button>
	);
}
