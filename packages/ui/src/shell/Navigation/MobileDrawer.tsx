"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useTranslation } from "@mels-loop/i18n/client";
import type { NavItem } from "../types";
import styles from "./MobileDrawer.module.css";

interface MobileDrawerProps {
  opened: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export function MobileDrawer({ opened, onClose, navItems }: MobileDrawerProps) {
  const { t } = useTranslation();

  return (
    <Dialog.Root open={opened} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content} aria-describedby={undefined}>
          <div className={styles.header}>
            <Dialog.Title className={styles.title}>
              {t("siteTitle")}
            </Dialog.Title>
            <Dialog.Close className={styles.close} aria-label="Close">
              &times;
            </Dialog.Close>
          </div>
          <nav className={styles.nav}>
            {navItems.map((item) => {
              const isAbsolute =
                item.href.startsWith("http://") ||
                item.href.startsWith("https://");
              const href = isAbsolute ? item.href : (item.href || "/");

              return (
                <a
                  key={item.key}
                  href={href}
                  className={styles.navLink}
                  onClick={onClose}
                  {...(isAbsolute
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {t(item.key)}
                </a>
              );
            })}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
