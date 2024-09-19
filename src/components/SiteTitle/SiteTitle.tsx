import React, { useMemo } from 'react';
import { useLocale } from 'hooks/useLocale';
import { Container, Link, Separator, Text } from '@melsloop/ml-components';
import { usePathname } from 'next/navigation';
import { SITE_SUBTITLE, SITE_TITLE } from '../../consts';
import classNames from 'classnames';
import styles from './SiteTitle.module.css';
import Logo from 'components/Logo/Logo';

type SiteTitleProps = {
	hideSubtitle?: boolean;
	className?: string;
};

const SiteTitle = ({ hideSubtitle, className }: SiteTitleProps) => {
	const { t } = useLocale();
	const pathname = usePathname();

	const isHome = pathname === '/';
	const siteTitle = t(SITE_TITLE);
	const siteSubtitle = t(SITE_SUBTITLE);

	const text = useMemo(
		() => (
			<>
				<Logo />
				<Text
					className={styles.title}
					variant="body1"
					size="md"
				>
					{siteTitle}
				</Text>
			</>
		),
		[siteTitle]
	);

	const link = useMemo(
		() => (
			<Link
				title={siteTitle}
				href="/"
				className={styles.link}
			>
				<Container>
					<Logo />
					<Text
						className={styles.title}
						size="md"
						variant="body1"
					>
						{siteTitle}
					</Text>
				</Container>
			</Link>
		),
		[siteTitle]
	);

	return (
		<Container
			alignItems="center"
			className={classNames(styles.root, className)}
		>
			{isHome ? text : link}
			{!hideSubtitle ? (
				<>
					<Separator size="xs" />
					<Text
						size="md"
						className={styles.subtitle}
						variant="body1"
					>
						{siteSubtitle}
					</Text>
				</>
			) : (
				''
			)}
		</Container>
	);
};

export default SiteTitle;
