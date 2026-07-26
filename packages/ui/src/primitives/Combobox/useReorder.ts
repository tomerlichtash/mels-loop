import { useCallback, useState } from 'react';

interface UseReorderOptions {
	values: string[];
	onReorder: (values: string[]) => void;
}

export function useReorder({ values, onReorder }: UseReorderOptions) {
	const [draggedValue, setDraggedValue] = useState<string | null>(null);
	const [dragOverValue, setDragOverValue] = useState<string | null>(null);
	const [dragOverSide, setDragOverSide] = useState<'before' | 'after' | null>(
		null,
	);

	const handleDragStart = useCallback(
		(e: React.DragEvent, itemValue: string) => {
			setDraggedValue(itemValue);
			e.dataTransfer.effectAllowed = 'move';
		},
		[],
	);

	const handleDragOver = useCallback(
		(e: React.DragEvent, itemValue: string) => {
			e.preventDefault();
			e.dataTransfer.dropEffect = 'move';
			const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
			const midpoint = rect.left + rect.width / 2;
			setDragOverValue(itemValue);
			setDragOverSide(e.clientX < midpoint ? 'before' : 'after');
		},
		[],
	);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			if (draggedValue && dragOverValue && draggedValue !== dragOverValue) {
				const current = [...values];
				const fromIndex = current.indexOf(draggedValue);
				if (fromIndex !== -1) {
					const item = current.splice(fromIndex, 1)[0];
					const targetIndex = current.indexOf(dragOverValue);
					const insertIndex =
						dragOverSide === 'after' ? targetIndex + 1 : targetIndex;
					current.splice(insertIndex, 0, item);
					onReorder(current);
				}
			}
			setDraggedValue(null);
			setDragOverValue(null);
			setDragOverSide(null);
		},
		[draggedValue, dragOverValue, dragOverSide, values, onReorder],
	);

	const handleDragEnd = useCallback(() => {
		setDraggedValue(null);
		setDragOverValue(null);
		setDragOverSide(null);
	}, []);

	const getDragState = (itemValue: string) => ({
		isDragging: draggedValue === itemValue,
		isDropBefore:
			dragOverValue === itemValue &&
			draggedValue !== itemValue &&
			dragOverSide === 'before',
		isDropAfter:
			dragOverValue === itemValue &&
			draggedValue !== itemValue &&
			dragOverSide === 'after',
	});

	return {
		handleDragStart,
		handleDragOver,
		handleDrop,
		handleDragEnd,
		getDragState,
	};
}
