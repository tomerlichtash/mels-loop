import Link from 'next/link';
import { useRouter } from 'next/router';
export type ILocale = 'en-US' | 'he-IL';
import { classes } from './footer.st.css'

export const Footer = ({ isHome }: { isHome: boolean }): JSX.Element => {
  const router = useRouter();
  const { locales } = router;
  const locs = locales as ILocale[];
  return (
    <footer className={classes.root}>

      {!isHome ? (
          <Link href="/">
            ← Back to home
          </Link>
      ) : null}

      <ul>
        {locs.map((locale) => (
          <li key={locale}>
            <Link href={router.asPath} locale={locale}>
              <a>{locale}</a>
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
