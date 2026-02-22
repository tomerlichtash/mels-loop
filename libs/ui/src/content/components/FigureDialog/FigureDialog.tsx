'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useRef, useState } from 'react';

import { Loader } from '../../../primitives/Loader/Loader';
import { useAnnotations } from '../../annotations/PopoverProvider/PopoverProvider';
import { SourceDetail } from '../../sources/SourceDetail/SourceDetail';
import Figure from '../Figure/Figure';
import styles from './FigureDialog.module.css';

type FigureDialogProps = React.ComponentProps<typeof Figure>;

export default function FigureDialog({
	children,
	...props
}: FigureDialogProps) {
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
				<Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
					<Dialog.Portal>
						<Dialog.Overlay className={styles.overlay} />
						<Dialog.Content
							className={styles.dialog}
							aria-describedby={undefined}
						>
							<Dialog.Title className={styles.visuallyHidden}>
								{source?.title ?? 'Source'}
							</Dialog.Title>
							<Dialog.Close className={styles.close} aria-label="Close">
								&times;
							</Dialog.Close>
							{!source ? (
								<div className={styles.loader}>
									<Loader size="md" />
								</div>
							) : (
								<SourceDetail source={source} />
							)}
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
			)}
		</>
	);
}
