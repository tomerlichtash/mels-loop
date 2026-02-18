"use client";

import { useId, useRef, useEffect, useMemo } from "react";
import { Popover, ScrollArea, Box, Text, Anchor } from "@mantine/core";
import type { ProcessedContent } from "@/lib/content/types";
import { useAnnotations } from "./AnnotationProvider";
import { ContentRenderer } from "./ContentRenderer";
import { PopoverNavBar } from "./PopoverNavBar";
import { PopoverInternalLink } from "./PopoverInternalLink";
import { usePopoverContent } from "./usePopoverContent";
import styles from "./AnnotationPopover.module.css";

interface AnnotationPopoverProps {
  sequence: string;
  target: string;
  content: ProcessedContent;
}

export function AnnotationPopover({
  sequence,
  target,
  content,
}: AnnotationPopoverProps) {
  const id = useId();
  const { activePopover, openPopover, registerTrigger } = useAnnotations();
  const opened = activePopover === id;
  const triggerRef = useRef<HTMLButtonElement>(null);

  const originalLabel = `[${sequence}]`;

  const {
    content: displayContent,
    label: displayLabel,
  } = usePopoverContent(content, target, originalLabel);

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
      width={360}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <Popover.Target>
        <button
          ref={triggerRef}
          type="button"
          className={styles.trigger}
          onClick={() => openPopover(id)}
          aria-label={`Annotation ${sequence}`}
        >
          {sequence}
        </button>
      </Popover.Target>
      <Popover.Dropdown className={styles.dropdown}>
        <div data-popover-content>
          <PopoverNavBar rootLabel={displayLabel} />
          <ScrollArea.Autosize mah={300}>
            <Box p="xs">
              <ContentRenderer
                hast={displayContent.hast}
                className={styles.body}
                components={componentOverrides}
              />
              {displayContent.metadata.source_name && (
                <Text size="xs" c="dimmed" mt="xs">
                  {displayContent.metadata.source_url ? (
                    <Anchor href={displayContent.metadata.source_url} size="xs">
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
