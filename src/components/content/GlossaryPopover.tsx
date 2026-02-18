"use client";

import { useId, useRef, useEffect, useMemo } from "react";
import { Popover, ScrollArea, Box, Text, Anchor } from "@mantine/core";
import type { ProcessedContent } from "@/lib/content/types";
import { useAnnotations } from "./AnnotationProvider";
import { useTranslation } from "@/i18n/client";
import { ContentRenderer } from "./ContentRenderer";
import { PopoverNavBar } from "./PopoverNavBar";
import { PopoverInternalLink } from "./PopoverInternalLink";
import { usePopoverContent } from "./usePopoverContent";
import styles from "./GlossaryPopover.module.css";

interface GlossaryPopoverProps {
  term: string;
  content: ProcessedContent;
  label?: React.ReactNode;
  children: React.ReactNode;
}

export function GlossaryPopover({
  term,
  content,
  label,
  children,
}: GlossaryPopoverProps) {
  const id = useId();
  const { locale } = useTranslation();
  const { activePopover, openPopover, registerTrigger } = useAnnotations();
  const opened = activePopover === id;
  const triggerRef = useRef<HTMLButtonElement>(null);

  const originalLabel = typeof label === "string"
    ? label
    : content.metadata.glossary_key || term;

  const {
    content: displayContent,
    term: displayTerm,
    label: displayLabel,
  } = usePopoverContent(content, term, originalLabel);

  const componentOverrides = useMemo(
    () => ({ a: PopoverInternalLink }),
    []
  );

  useEffect(() => {
    registerTrigger(id, triggerRef.current);
    return () => registerTrigger(id, null);
  }, [id, registerTrigger]);

  return (
    <Popover
      opened={opened}
      position="bottom"
      withArrow
      shadow="md"
      width={320}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <Popover.Target>
        <button
          ref={triggerRef}
          type="button"
          className={styles.trigger}
          onClick={() => openPopover(id)}
          aria-label={`Glossary: ${term}`}
        >
          {children}
        </button>
      </Popover.Target>
      <Popover.Dropdown className={styles.dropdown}>
        <div data-popover-content>
          <Box className={styles.header} p="xs">
            <Text fw={700} size="sm" tt="uppercase">
              {displayLabel}
            </Text>
            {locale === "he" && (
              <Text size="xs" c="dimmed" dir="ltr">
                {displayTerm.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </Text>
            )}
          </Box>
          <PopoverNavBar rootLabel={originalLabel} />
          <ScrollArea.Autosize mah={250}>
            <Box p="xs">
              <ContentRenderer
                hast={displayContent.hast}
                className={styles.body}
                components={componentOverrides}
              />
              {displayContent.metadata.source_name && (
                <Text size="xs" c="dimmed" mt="xs">
                  {displayContent.metadata.source_url ? (
                    <Anchor href={displayContent.metadata.source_url} size="xs" target="_blank">
                      {displayContent.metadata.source_name}
                    </Anchor>
                  ) : (
                    displayContent.metadata.source_name
                  )}
                </Text>
              )}
            </Box>
          </ScrollArea.Autosize>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
