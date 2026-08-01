'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { SlideImage } from 'yet-another-react-lightbox';

import styles from './ImageViewer.module.css';

/** A slide that knows which archive source it came from, if any. */
export type ViewerSlide = SlideImage & { sourceId?: string };

/* The lightbox and its stylesheets load only once a reader opens an image. */
const LightboxModal = dynamic(() => import('./LightboxModal'), { ssr: false });

/** Marks an image as openable. Set by the renderer's Image element. */
const ZOOMABLE = 'img[data-zoomable]';

/**
 * Width the lightbox asks the image optimiser for.
 *
 * Must be one of next/image's configured widths — an unlisted value is
 * rejected with a 400, not rounded to the nearest. 1920 is in the default
 * deviceSizes and sits above the 2000px ceiling the masters are stored at, so
 * it is the most the optimiser can actually produce for them.
 */
const LIGHTBOX_WIDTH = 1920;

/**
 * The article's derivative, re-requested at lightbox size.
 *
 * Slides used to carry `currentSrc` straight from the page, which meant the
 * lightbox displayed the same file the column did — 750px — and the zoom
 * plugin magnified those pixels rather than revealing any. On an archive whose
 * images are census forms, punch printouts and coding sheets, zooming into a
 * primary source showed nothing that reading the caption had not.
 *
 * Only the width parameter changes, so the optimiser treats it as a separate
 * derivative and caches it as one. Anything that is not an optimiser URL — an
 * SVG, an unoptimised remote host — has no `w=` to rewrite and is returned
 * untouched.
 */
function lightboxSrc(src: string): string {
	if (!src.includes('/_next/image')) return src;
	return src.replace(/([?&]w=)\d+/, `$1${LIGHTBOX_WIDTH}`);
}

/**
 * Provenance for an image drawn from the source registry.
 *
 * rehypeSourceImages already writes the author, repository and licence onto the
 * element, so the viewer can show where a picture came from without fetching
 * anything — which matters here, because the dialog this replaced was the only
 * place that information appeared once an image was opened.
 */
function provenance(el: HTMLImageElement): string | undefined {
	const parts = [
		el.dataset.sourceAuthor,
		el.dataset.sourceRepository,
		/* Stored as a slug — "public-domain" reads as a filename otherwise. */
		el.dataset.sourceLicense?.replace(/-/g, ' '),
	].filter(Boolean);
	/*
	 * Deduplicated: for an institutional record the author and the credit are
	 * often the same body — the Ellis Island Foundation both holds the ship
	 * manifest and is credited for it — and the line came out naming it twice.
	 */
	const unique = [...new Set(parts)];
	return unique.length ? unique.join(' · ') : undefined;
}

function toSlide(el: HTMLImageElement, sourceLabel: string): ViewerSlide {
	/* The figure's caption where there is one, so what sits under the slide is
	 * what the reader saw under the image on the page. */
	const caption =
		el.closest('figure')?.querySelector('figcaption')?.textContent?.trim() ||
		el.alt ||
		'';

	const sourceId = el.dataset.sourceId;
	const credit = provenance(el);

	return {
		src: lightboxSrc(el.currentSrc || el.src),
		alt: el.alt || '',
		title: caption,
		/*
		 * Provenance, and a way through to the full archive record.
		 *
		 * The record used to sit behind a toggle inside the lightbox, which put a
		 * panel and a button over the picture and collided with the paging arrow.
		 * A line of credit and a link is enough here: the whole record already
		 * has a page of its own, laid out for reading.
		 */
		description:
			sourceId || credit ? (
				<span className={styles.caption}>
					{credit}
					{sourceId && (
						<a
							href={`/sources/${sourceId}`}
							className={styles.sourceLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							{sourceLabel}
						</a>
					)}
				</span>
			) : undefined,
		sourceId,
	};
}

/**
 * Opens the article's images full size.
 *
 * Mounted once per page rather than wrapped around each image: it listens for
 * clicks on any `[data-zoomable]` image and builds the gallery from all of them
 * at the moment of the click. An article carries as many as nineteen figures,
 * and a reader who opens one usually wants to page through the rest — so every
 * image on the page becomes one gallery, opening at whichever was clicked.
 *
 * This replaces a click handler that only ever bound to images carrying a
 * `data-source-id`, which is to say only images drawn from the source registry.
 * On the Mel Kaye article that was one figure out of nineteen, and what it
 * opened was the source's metadata rather than the picture.
 */
export function ImageViewer() {
	const { t } = useTranslation();
	const [slides, setSlides] = useState<ViewerSlide[] | null>(null);
	const [index, setIndex] = useState(0);
	const [open, setOpen] = useState(false);
	/* Focus returns here on close, so keyboard users are not dropped at the top
	 * of the document. */
	const opener = useRef<HTMLElement | null>(null);
	/* Read inside a listener that is bound once, so it is held in a ref rather
	 * than captured from the render that installed it. */
	const sourceLabel = useRef('');
	sourceLabel.current = t('imageViewer.sourceDetails');

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			const target = (event.target as Element)?.closest?.(ZOOMABLE);
			if (!(target instanceof HTMLImageElement)) return;
			event.preventDefault();

			opener.current = target;
			const all = [...document.querySelectorAll<HTMLImageElement>(ZOOMABLE)];
			setSlides(all.map((img) => toSlide(img, sourceLabel.current)));
			setIndex(Math.max(0, all.indexOf(target)));
			setOpen(true);
		}

		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, []);

	const labels = useMemo(
		() => ({
			Close: t('imageViewer.close'),
			'Zoom in': t('imageViewer.zoomIn'),
			'Zoom out': t('imageViewer.zoomOut'),
			Previous: t('imageViewer.previous'),
			Next: t('imageViewer.next'),
		}),
		[t],
	);

	if (!slides) return null;

	return (
		<LightboxModal
			slides={slides}
			index={index}
			open={open}
			labels={labels}
			onClose={() => setOpen(false)}
			/* Held until the close animation finishes, so the exit still animates
			 * before the slides are dropped. */
			onExited={() => {
				opener.current?.focus?.();
				opener.current = null;
				setSlides(null);
			}}
		/>
	);
}
