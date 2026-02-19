"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
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
    <NavigationMenu.Root className={styles.root}>
      <NavigationMenu.List className={styles.list}>
        {navItems.map((item) => {
          const isAbsolute =
            item.href.startsWith("http://") ||
            item.href.startsWith("https://");
          const href = isAbsolute ? item.href : item.href || "/";
          const isActive = !isAbsolute && pathname.startsWith(href);

          return (
            <NavigationMenu.Item key={item.key}>
              {item.hasContent ? (
                <>
                  <NavigationMenu.Trigger className={styles.trigger}>
                    {t(item.key)}
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className={styles.content}>
                    <div className={styles.contentPanel}>
                      <p className={styles.contentTitle}>
                        {t("featured.title")}
                      </p>
                      <p className={styles.contentDescription}>
                        {t("featured.subtitle")}
                      </p>
                      <a href={href} className={styles.contentCta}>
                        {t("featured.linkPrefix")} &rarr;
                      </a>
                    </div>
                  </NavigationMenu.Content>
                </>
              ) : (
                <NavigationMenu.Link asChild active={isActive}>
                  <a
                    href={href}
                    className={styles.link}
                    {...(isAbsolute
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {t(item.key)}
                  </a>
                </NavigationMenu.Link>
              )}
            </NavigationMenu.Item>
          );
        })}

        <NavigationMenu.Indicator className={styles.indicator}>
          <div className={styles.arrow} />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className={styles.viewportPosition}>
        <NavigationMenu.Viewport className={styles.viewport} />
      </div>
    </NavigationMenu.Root>
  );
}
