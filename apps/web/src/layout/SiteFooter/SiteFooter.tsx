'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import {
	EnvelopeClosedIcon,
	GitHubLogoIcon,
	HeartIcon,
	InfoCircledIcon,
	ReaderIcon,
	TwitterLogoIcon,
} from '@radix-ui/react-icons';

import type { FooterLink as FooterLinkType, FooterLinkColumn } from '../types';
import styles from './SiteFooter.module.css';

const iconMap = {
	github: GitHubLogoIcon,
	twitter: TwitterLogoIcon,
	envelope: EnvelopeClosedIcon,
	info: InfoCircledIcon,
	reader: ReaderIcon,
	heart: HeartIcon,
} as const;

function FooterLink({ link }: { link: FooterLinkType }) {
	const { t } = useTranslation();
	const Icon = link.icon ? iconMap[link.icon] : null;

	return (
		<a
			href={link.href}
			className={styles.link}
			{...(link.external
				? { target: '_blank', rel: 'noopener noreferrer' }
				: {})}
		>
			{Icon && <Icon className={styles.linkIcon} />}
			{t(link.label)}
		</a>
	);
}

interface SiteFooterProps {
	linkColumns?: FooterLinkColumn[];
}

export function SiteFooter({ linkColumns }: SiteFooterProps) {
	const { t } = useTranslation();

	return (
		<footer className={styles.root}>
			<div className={styles.inner}>
				<div className={styles.columns}>
					<div className={styles.meta}>
						<p className={styles.copyright}>
							{new Date().getFullYear()}{' '}
							<span
								className={styles.license}
								title={t('siteLicenseAttrs').toUpperCase()}
							>
								({t('siteLicenseLabel').toUpperCase()})
							</span>{' '}
							{t('siteTitle')}
							<br />
							<span className={styles.subtitle}>{t('siteSubtitle')}</span>
						</p>
						<p className={styles.description}>{t('menuDescriptions.about')}</p>
					</div>

					{linkColumns?.map((col) => (
						<div key={col.titleKey} className={styles.linkCol}>
							<p className={styles.colTitle}>{t(col.titleKey)}</p>
							<ul className={styles.linkList}>
								{col.links.map((link) => (
									<li key={link.href}>
										<FooterLink link={link} />
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</footer>
	);
}
