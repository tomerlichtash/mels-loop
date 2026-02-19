"use client";

import { useMemo } from "react";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import type { Root as HastRoot, Element, ElementContent } from "hast";
import { Figure } from "../Figure/Figure";
import { CodeBlock } from "../CodeBlock/CodeBlock";
import { StyledTable } from "../StyledTable/StyledTable";
import { OptimizedImage } from "../OptimizedImage/OptimizedImage";
import styles from "./ContentRenderer.module.css";

type ComponentOverrides = Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ComponentType<any>
>;

interface ContentRendererProps {
  hast: HastRoot;
  components?: ComponentOverrides;
  className?: string;
}

function defaultComponents(): ComponentOverrides {
  return {
    figure: Figure,
    pre: CodeBlock,
    table: StyledTable,
    img: OptimizedImage,
  };
}

export function ContentRenderer({
  hast,
  components: extraComponents,
  className,
}: ContentRendererProps) {
  const components = useMemo(
    () => ({ ...defaultComponents(), ...extraComponents }),
    [extraComponents]
  );

  const content = useMemo(() => {
    try {
      return toJsxRuntime(hast as unknown as ElementContent | HastRoot, {
        Fragment,
        jsx,
        jsxs,
        components,
        ignoreInvalidStyle: true,
      });
    } catch (error) {
      console.error("ContentRenderer error:", error);
      return null;
    }
  }, [hast, components]);

  return (
    <div className={`${styles.content} ${className || ""}`}>
      {content}
    </div>
  );
}
