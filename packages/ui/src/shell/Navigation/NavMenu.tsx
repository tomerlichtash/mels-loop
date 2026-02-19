"use client";

import { useTranslation } from "@mels-loop/i18n/client";
import { usePathname } from "next/navigation";
import type { NavItem } from "../types";
import styles from "./NavMenu.module.css";

interface NavMenuProps {
  navItems: NavItem[];
}

export function NavMenu({ navItems }: NavMenuProps) {
  const { locale, t } = useTranslation();
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {navItems.map((item) => {
        const isAbsolute =
          item.href.startsWith("http://") || item.href.startsWith("https://");
        const href = isAbsolute ? item.href : (item.href || "/");
        const isActive = !isAbsolute && pathname.startsWith(href);

        return (
          <a
            key={item.key}
            href={href}
            className={`${styles.navLink} ${isActive ? styles.active : ""}`}
            {...(isActive ? { "aria-current": "page" as const } : {})}
            {...(isAbsolute ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {t(item.key)}
          </a>
        );
      })}
    </nav>
  );
}
