'use client';

import React, { useMemo } from 'react';
import { useLocale } from 'hooks/useLocale';
import { Container, Text } from '@melsloop/ml-components';
import { SITE_LICENSE, SITE_SHORT_DESC, SITE_SUBTITLE } from 'consts';
import SiteFooterNavigation from './SiteFooterNavigation';
import classNames from 'classnames';
import styles from './SiteFooter.module.css';

type SiteFooterProps = {
	className?: string;
};

const SiteFooter = ({ className }: SiteFooterProps) => {
	const { t } = useLocale();

	const siteSubtitle = t(SITE_SUBTITLE);
	const siteLicense = t(SITE_LICENSE, {
		toYear: new Date().getFullYear()
	});

	return useMemo(
		() => (
			<Container
				justifyContent="center"
				alignContent="center"
				alignItems="center"
				verticalPadding="2em"
				className={classNames(styles.root, className)}
			>
				<footer className={styles.footer}>
					<Container
						className={styles.columns}
						gap="lg"
					>
						<Container flexDirection="column">
							<Text
								className={classNames(styles.column)}
								variant="h5"
								aria-label={siteLicense}
							>
								{siteLicense}
							</Text>
							<Text>{siteSubtitle}</Text>
							<Text>{t(SITE_SHORT_DESC)}</Text>
						</Container>
						<SiteFooterNavigation />
					</Container>
				</footer>
			</Container>
		),
		[className, siteLicense, siteSubtitle, t]
	);
};

export default SiteFooter;
