'use client';

import type { ResolvedSource } from '@mels-loop/content-loaders/types';
import { useTranslation } from '@mels-loop/i18n/client';
import Image from 'next/image';

import { isImageUrl } from '@/lib/source-media';

import { SourceBadge } from '../SourceBadge/SourceBadge';
import styles from './SourceDetail.module.css';

interface SourceDetailProps {
	source: ResolvedSource;
}

export function SourceDetail({ source }: SourceDetailProps) {
	const { t } = useTranslation();
	return (
		<div className={styles.content}>
			<div className={styles.header}>
				<SourceBadge type={source.type} />
				<p className={styles.title}>{source.title}</p>
			</div>
			{isImageUrl(source.url) && (
				<div className={styles.imageWrap}>
					<Image
						src={source.url}
						alt={source.title}
						width={600}
						height={300}
						className={styles.image}
					/>
				</div>
			)}
			{source.description && (
				<p className={styles.description}>{source.description}</p>
			)}
			<dl className={styles.meta}>
				{source.author && (
					<>
						<dt>{t('sources.colAuthor')}</dt>
						<dd>{source.author}</dd>
					</>
				)}
				{source.date && (
					<>
						<dt>{t('sources.colDate')}</dt>
						<dd>{source.date}</dd>
					</>
				)}
				{source.credit && (
					<>
						<dt>{t('sources.colCredit')}</dt>
						<dd>{source.credit}</dd>
					</>
				)}
				{source.license && (
					<>
						<dt>{t('sources.colLicense')}</dt>
						<dd>{source.license}</dd>
					</>
				)}
			</dl>
			<a href={`/sources/${source.id}`} className={styles.openLink}>
				{t('sources.viewRecord')} →
			</a>
		</div>
	);
}
