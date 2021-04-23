import Link from 'next/link';
import { useRouter } from 'next/router';

import utilStyles from '../styles/utils.module.css';

export const Footer = (): JSX.Element => {
  const router = useRouter();
  const { locales } = router;
  return (
    <footer className={utilStyles.footer}>
      <p>&copy; 2020</p>

      <ul>
        {locales.map((locale) => (
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
