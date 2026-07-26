import { CaretDownIcon } from '@phosphor-icons/react/ssr';
import * as RadixAccordion from '@radix-ui/react-accordion';
import cn from 'classnames';
import { forwardRef, type ReactNode } from 'react';

import styles from './Accordion.module.css';

type AccordionType = 'single' | 'multiple';

export interface AccordionProps {
	children: ReactNode;
	type?: AccordionType;
	defaultValue?: string | string[];
	collapsible?: boolean;
	className?: string;
}

export function Accordion({
	children,
	type = 'multiple',
	defaultValue,
	collapsible = true,
	className,
}: AccordionProps) {
	if (type === 'single') {
		return (
			<RadixAccordion.Root
				type="single"
				defaultValue={defaultValue as string | undefined}
				collapsible={collapsible}
				className={cn(styles.root, 'ml-accordion', className)}
			>
				{children}
			</RadixAccordion.Root>
		);
	}

	return (
		<RadixAccordion.Root
			type="multiple"
			defaultValue={defaultValue as string[] | undefined}
			className={cn(styles.root, 'ml-accordion', className)}
		>
			{children}
		</RadixAccordion.Root>
	);
}

export interface AccordionItemProps {
	value: string;
	children: ReactNode;
	className?: string;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
	({ value, children, className }, ref) => (
		<RadixAccordion.Item
			ref={ref}
			value={value}
			className={cn(styles.item, 'ml-accordion-item', className)}
		>
			{children}
		</RadixAccordion.Item>
	),
);
AccordionItem.displayName = 'AccordionItem';

export interface AccordionTriggerProps {
	children: ReactNode;
	className?: string;
}

export const AccordionTrigger = forwardRef<
	HTMLButtonElement,
	AccordionTriggerProps
>(({ children, className }, ref) => (
	<RadixAccordion.Header className={styles.header}>
		<RadixAccordion.Trigger
			ref={ref}
			className={cn(styles.trigger, 'ml-accordion-trigger', className)}
		>
			<CaretDownIcon className={styles.chevron} aria-hidden />
			{children}
		</RadixAccordion.Trigger>
	</RadixAccordion.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

export interface AccordionContentProps {
	children: ReactNode;
	className?: string;
}

export const AccordionContent = forwardRef<
	HTMLDivElement,
	AccordionContentProps
>(({ children, className }, ref) => (
	<RadixAccordion.Content
		ref={ref}
		className={cn(styles.content, 'ml-accordion-content', className)}
	>
		<div className={styles.contentInner}>{children}</div>
	</RadixAccordion.Content>
));
AccordionContent.displayName = 'AccordionContent';
