"use client";

import { useId, useRef, useEffect, useMemo } from "react";
import * as Popover from "@radix-ui/react-popover";
import type { ProcessedContent } from "@mels-loop/content-pipeline/types";
import { useAnnotations } from "../AnnotationProvider/AnnotationProvider";
import { useTranslation } from "@mels-loop/i18n/client";
import { ContentRenderer } from "../ContentRenderer/ContentRenderer";
import { PopoverNavBar } from "../PopoverNavBar/PopoverNavBar";
import { PopoverInternalLink } from "../PopoverInternalLink/PopoverInternalLink";
import { usePopoverContent } from "../usePopoverContent/usePopoverContent";
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
    <Popover.Root open={opened}>
      <Popover.Trigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className={styles.trigger}
          onClick={() => openPopover(id)}
          aria-label={`Glossary: ${term}`}
        >
          {children}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={styles.dropdown}
          side="bottom"
          align="center"
          sideOffset={4}
        >
          <Popover.Arrow className={styles.arrow} />
          <div data-popover-content>
            <div className={styles.header}>
              <p className={styles.headerTitle}>{displayLabel}</p>
              {locale === "he" && (
                <p className={styles.headerSub} dir="ltr">
                  {displayTerm.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </p>
              )}
            </div>
            <PopoverNavBar rootLabel={originalLabel} />
            <div className={styles.scrollArea}>
              <div className={styles.bodyWrap}>
                <ContentRenderer
                  hast={displayContent.hast}
                  className={styles.body}
                  components={componentOverrides}
                />
                {displayContent.metadata.source_name && (
                  <p className={styles.source}>
                    {displayContent.metadata.source_url ? (
                      <a href={displayContent.metadata.source_url} className={styles.sourceLink} target="_blank">
                        {displayContent.metadata.source_name}
                      </a>
                    ) : (
                      displayContent.metadata.source_name
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
