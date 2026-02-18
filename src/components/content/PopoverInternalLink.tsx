"use client";

import { isValidElement, type ReactNode } from "react";
import Link from "next/link";
import { useAnnotations } from "./AnnotationProvider";
import styles from "./GlossaryPopover.module.css";

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return extractText(node.props.children);
  return "";
}

interface PopoverInternalLinkProps {
  href?: string;
  children?: ReactNode;
  "data-link-type"?: string;
  "data-link-target"?: string;
  "data-sequence"?: string;
  [key: string]: unknown;
}

export function PopoverInternalLink({
  href,
  children,
  "data-link-type": linkType,
  "data-link-target": linkTarget,
  "data-sequence": sequence,
  ...props
}: PopoverInternalLinkProps) {
  const { pushNav } = useAnnotations();

  if (linkType === "glossary" && linkTarget) {
    const text = extractText(children);
    const label = text || linkTarget.replace(/-/g, " ");
    // DEBUG: remove after verifying
    console.log("[PopoverInternalLink]", { children, typeof: typeof children, text, label, linkTarget });
    return (
      <button
        type="button"
        className={styles.trigger}

        onClick={() =>
          pushNav({ type: "glossary", key: linkTarget, label })
        }
      >
        {children}
      </button>
    );
  }

  if (linkType === "annotation" && linkTarget && sequence) {
    return (
      <button
        type="button"
        className={styles.trigger}

        onClick={() =>
          pushNav({
            type: "annotation",
            key: linkTarget,
            label: `[${sequence}]`,
          })
        }
      >
        {children}
      </button>
    );
  }

  // Regular links: external or internal
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
