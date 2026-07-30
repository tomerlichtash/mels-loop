'use client';

import { Dialog, Figure, Loader } from '@mels-loop/ui/primitives';
import { useEffect, useRef, useState } from 'react';

import { useAnnotations } from '../../../popover/providers/PopoverProvider';
import { SourceDetail } from '../../../sources/SourceDetail/SourceDetail';
import styles from './FigureDialog.module.css';

type FigureDialogProps = React.ComponentProps<typeof Figure>;

export function FigureDialog({ children, ...props }: FigureDialogProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [sourceId, setSourceId] = useState<string | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const { sources, loadingKeys, loadResolvedSource } = useAnnotations();

	useEffect(() => {
		const img = containerRef.current?.querySelector(
			'img[data-source-id]',
		) as HTMLImageElement | null;
		if (!img) return;
		setSourceId(img.getAttribute('data-source-id'));

		/*
		 * No click handler here any more. ImageViewer listens for clicks on any
		 * zoomable image and opens the page's gallery; binding a second handler
		 * to source-backed images would have opened this dialog *and* the
		 * lightbox from the one click.
		 *
		 * The source id is still read, so the dialog remains available to
		 * anything that opens it deliberately.
		 */
	}, []);

	useEffect(() => {
		if (
			dialogOpen &&
			sourceId &&
			!sources[sourceId] &&
			!loadingKeys.has(sourceId)
		) {
			loadResolvedSource(sourceId);
		}
	}, [dialogOpen, sourceId, sources, loadingKeys, loadResolvedSource]);

	const source = sourceId ? sources[sourceId] : undefined;

	return (
		<>
			<div ref={containerRef}>
				<Figure {...props}>{children}</Figure>
			</div>
			{sourceId && (
				<Dialog
					open={dialogOpen}
					onOpenChange={setDialogOpen}
					title={source?.title ?? 'Source'}
				>
					{!source ? (
						<div className={styles.loader}>
							<Loader size="md" />
						</div>
					) : (
						<SourceDetail source={source} />
					)}
				</Dialog>
			)}
		</>
	);
}
