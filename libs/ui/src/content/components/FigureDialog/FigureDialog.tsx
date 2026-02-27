'use client';

import { useEffect, useRef, useState } from 'react';

import { Dialog, Figure, Loader } from '../../../primitives';
import { useAnnotations } from '../../annotations/PopoverProvider/PopoverProvider';
import { SourceDetail } from '../../sources/SourceDetail/SourceDetail';
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

		const handleClick = () => setDialogOpen(true);
		img.addEventListener('click', handleClick);
		img.style.cursor = 'pointer';
		return () => img.removeEventListener('click', handleClick);
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
