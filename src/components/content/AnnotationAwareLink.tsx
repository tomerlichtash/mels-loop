"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useAnnotations } from "./AnnotationProvider";
import { AnnotationPopover } from "./AnnotationPopover";
import { GlossaryPopover } from "./GlossaryPopover";

interface AnnotationAwareLinkProps {
  href?: string;
  children?: ReactNode;
  "data-link-type"?: string;
  "data-link-target"?: string;
  "data-sequence"?: string;
  [key: string]: unknown;
}

export function AnnotationAwareLink({
  href,
  children,
  "data-link-type": linkType,
  "data-link-target": linkTarget,
  "data-sequence": sequence,
  ...props
}: AnnotationAwareLinkProps) {
  const { annotations, glossary } = useAnnotations();

  if (linkType === "annotation" && linkTarget) {
    const annotationContent = annotations[linkTarget];
    if (annotationContent && sequence) {
      return (
        <AnnotationPopover
          sequence={sequence}
          target={linkTarget}
          content={annotationContent}
        />
      );
    }
  }

  if (linkType === "glossary" && linkTarget) {
    const glossaryContent = glossary[linkTarget];
    if (glossaryContent) {
      return (
        <GlossaryPopover term={linkTarget} content={glossaryContent} label={children}>
          {children}
        </GlossaryPopover>
      );
    }
  }

  // Regular link: internal links use Next Link, external use <a>
  if (!href) {
    return <span {...props}>{children}</span>;
  }

  const isExternal =
    href.startsWith("http://") || href.startsWith("https://");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
