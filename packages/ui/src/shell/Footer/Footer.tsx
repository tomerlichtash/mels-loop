"use client";

import { useTranslation } from "@mels-loop/i18n/client";
import { GitHubLogoIcon, TwitterLogoIcon, EnvelopeClosedIcon, InfoCircledIcon, ReaderIcon, HeartIcon } from "@radix-ui/react-icons";
import type { FooterLinkColumn } from "../types";
import styles from "./Footer.module.css";

const iconMap = {
  github: GitHubLogoIcon,
  twitter: TwitterLogoIcon,
  envelope: EnvelopeClosedIcon,
  info: InfoCircledIcon,
  reader: ReaderIcon,
  heart: HeartIcon,
} as const;

interface FooterProps {
  linkColumns?: FooterLinkColumn[];
}

export function Footer({ linkColumns }: FooterProps) {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div className={styles.meta}>
            <p className={styles.copyright}>
              {new Date().getFullYear()}{" "}
              <span
                className={styles.license}
                title={t("siteLicenseAttrs").toUpperCase()}
              >
                ({t("siteLicenseLabel").toUpperCase()})
              </span>{" "}
              {t("siteTitle")}
              <br />
              <span className={styles.subtitle}>{t("siteSubtitle")}</span>
            </p>
            <p className={styles.description}>{t("menuDescriptions.about")}</p>
          </div>

          {linkColumns?.map((col) => (
            <div key={col.titleKey} className={styles.linkCol}>
              <p className={styles.colTitle}>{t(col.titleKey)}</p>
              <ul className={styles.linkList}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={styles.link}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.icon && iconMap[link.icon] && (() => {
                        const Icon = iconMap[link.icon!];
                        return <Icon className={styles.linkIcon} />;
                      })()}
                      {t(link.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
