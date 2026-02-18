"use client";

import { useAnnotations } from "./AnnotationProvider";
import styles from "./PopoverNavBar.module.css";

interface PopoverNavBarProps {
  rootLabel: string;
}

export function PopoverNavBar({ rootLabel }: PopoverNavBarProps) {
  const { navStack, popNavTo } = useAnnotations();

  if (navStack.length === 0) return null;

  return (
    <nav className={styles.navBar} aria-label="Popover navigation">
      <button
        type="button"
        className={styles.crumb}

        onClick={() => popNavTo(-1)}
      >
        {rootLabel}
      </button>
      {navStack.map((entry, i) => {
        const isLast = i === navStack.length - 1;
        return (
          <span key={i}>
            <span className={styles.separator} aria-hidden>
              ›
            </span>{" "}
            {isLast ? (
              <span className={styles.current}>{entry.label}</span>
            ) : (
              <button
                type="button"
                className={styles.crumb}
        
                onClick={() => popNavTo(i)}
              >
                {entry.label}
              </button>
            )}
          </span>
        );
      })}
    </nav>
  );
}
