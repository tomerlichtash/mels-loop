"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import type { ProcessedContent } from "@/lib/content/types";

export interface NavStackEntry {
  type: "glossary" | "annotation";
  key: string;
  label: string;
}

interface AnnotationContextValue {
  annotations: Record<string, ProcessedContent>;
  glossary: Record<string, ProcessedContent>;
  activePopover: string | null;
  openPopover: (id: string) => void;
  closePopover: () => void;
  registerTrigger: (id: string, el: HTMLElement | null) => void;
  navStack: NavStackEntry[];
  pushNav: (entry: NavStackEntry) => void;
  popNavTo: (index: number) => void;
}

const AnnotationContext = createContext<AnnotationContextValue>({
  annotations: {},
  glossary: {},
  activePopover: null,
  openPopover: () => {},
  closePopover: () => {},
  registerTrigger: () => {},
  navStack: [],
  pushNav: () => {},
  popNavTo: () => {},
});

export function AnnotationProvider({
  annotations,
  glossary,
  children,
}: {
  annotations: Record<string, ProcessedContent>;
  glossary: Record<string, ProcessedContent>;
  children: ReactNode;
}) {
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const [navStack, setNavStack] = useState<NavStackEntry[]>([]);
  const triggersRef = useRef<Map<string, HTMLElement>>(new Map());

  const openPopover = useCallback((id: string) => {
    setActivePopover((current) => (current === id ? null : id));
  }, []);

  const closePopover = useCallback(() => {
    setActivePopover(null);
  }, []);

  const pushNav = useCallback((entry: NavStackEntry) => {
    setNavStack((prev) => [...prev, entry]);
  }, []);

  const popNavTo = useCallback((index: number) => {
    setNavStack((prev) => prev.slice(0, index + 1));
  }, []);

  // Reset nav stack when active popover changes
  useEffect(() => {
    setNavStack([]);
  }, [activePopover]);

  const registerTrigger = useCallback((id: string, el: HTMLElement | null) => {
    if (el) {
      triggersRef.current.set(id, el);
    } else {
      triggersRef.current.delete(id);
    }
  }, []);

  // Close on click outside any trigger or dropdown
  useEffect(() => {
    if (!activePopover) return;

    function handleClick(e: MouseEvent) {
      const target = e.target as Node;

      // Check if click is inside any popover trigger
      for (const el of triggersRef.current.values()) {
        if (el.contains(target)) return;
      }

      // Check if click is inside any popover dropdown content
      const el =
        target instanceof Element ? target : target.parentElement;
      if (el?.closest("[data-popover-content]")) return;

      setActivePopover(null);
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActivePopover(null);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePopover]);

  return (
    <AnnotationContext.Provider
      value={{
        annotations,
        glossary,
        activePopover,
        openPopover,
        closePopover,
        registerTrigger,
        navStack,
        pushNav,
        popNavTo,
      }}
    >
      {children}
    </AnnotationContext.Provider>
  );
}

export function useAnnotations() {
  return useContext(AnnotationContext);
}
