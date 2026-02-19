import { getDictionary } from "@mels-loop/i18n/server";
import type { Locale } from "@mels-loop/i18n/config";
import { Button } from "@mels-loop/ui/primitives";
import styles from "./Hero.module.css";

interface HeroProps {
  locale: Locale;
  ctaHref: string;
}

export async function Hero({ locale, ctaHref }: HeroProps) {
  const messages = await getDictionary(locale);
  const hero = messages.hero as Record<string, string>;

  return (
    <section className={styles.hero}>
      <p className={styles.description}>{hero.description}</p>
      <div className={styles.cta}>
        <Button component="a" href={ctaHref} size="xl" className={styles.ctaButton}>
          {hero.cta}
        </Button>
      </div>
    </section>
  );
}
