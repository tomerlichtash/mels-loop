'use client';

import { useTranslation } from '@mels-loop/i18n/client';

import type { FooterLink as FooterLinkType, FooterLinkColumn } from '../types';
import styles from './SiteFooter.module.css';

/**
 * First year of the project, matching the LICENSE copyright. The footer shows
 * a range from here to the current year rather than the current year alone,
 * which read as though the site appeared this year.
 */
const SITE_START_YEAR = 2021;

function FooterLink({ link }: { link: FooterLinkType }) {
	const { t } = useTranslation();

	return (
		<a
			href={link.href}
			className={styles.link}
			{...(link.external
				? { target: '_blank', rel: 'noopener noreferrer' }
				: {})}
		>
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
			<span className="gradient-strip" />
			<div className={styles.inner}>
				<div className={styles.columns}>
					<div className={styles.meta}>
						<p className={styles.copyright}>
							{SITE_START_YEAR}
							{new Date().getFullYear() > SITE_START_YEAR &&
								`–${new Date().getFullYear()}`}{' '}
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
