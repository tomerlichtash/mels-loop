'use client';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
/* Last, so it overrides the two above. */
import './LightboxModal.module.css';

import {
	CaretLeftIcon,
	CaretRightIcon,
	MinusIcon,
	PlusIcon,
	XIcon,
} from '@phosphor-icons/react/ssr';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import type { ViewerSlide } from './ImageViewer';

interface LightboxModalProps {
	slides: ViewerSlide[];
	index: number;
	open: boolean;
	labels: Record<string, string>;
	onClose: () => void;
	onExited: () => void;
}

/**
 * The heavy half of ImageViewer — the lightbox and its stylesheets.
 *
 * Split into its own module and loaded through next/dynamic so none of it is
 * downloaded until a reader actually opens an image. Most visits never will.
 *
 * One slide is a plain viewer; several turn it into a gallery with prev/next.
 */
export default function LightboxModal({
	slides,
	index,
	open,
	labels,
	onClose,
	onExited,
}: LightboxModalProps) {
	const gallery = slides.length > 1;

	return (
		<Lightbox
			open={open}
			close={onClose}
			slides={slides}
			index={index}
			plugins={[Zoom, Captions]}
			/* Wraps around in a gallery, so paging never dead-ends. */
			carousel={{ finite: !gallery }}
			controller={{ closeOnBackdropClick: true }}
			zoom={{ scrollToZoom: true, maxZoomPixelRatio: 3 }}
			on={{ exited: onExited }}
			labels={labels}
			render={{
				/* The site's own icon set, sized by the lightbox's .yarl__icon rule. */
				iconClose: () => <XIcon className="yarl__icon" />,
				iconZoomIn: () => <PlusIcon className="yarl__icon" />,
				iconZoomOut: () => <MinusIcon className="yarl__icon" />,
				/*
				 * A lone image has nothing to page to, so its arrows are removed
				 * rather than left as dead controls.
				 */
				...(gallery
					? {
							iconPrev: () => <CaretLeftIcon className="yarl__icon" />,
							iconNext: () => <CaretRightIcon className="yarl__icon" />,
						}
					: { buttonPrev: () => null, buttonNext: () => null }),
			}}
		/>
	);
}
