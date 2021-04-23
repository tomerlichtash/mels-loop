import Link from 'next/link';
import { useRouter } from 'next/router';

import utilStyles from '../styles/utils.module.css';

export const Footer = (): JSX.Element => {
  const router = useRouter();
  return (
    <footer className={utilStyles.footer}>
      <p>© 2020</p>

      <ul>
        {router.locales.map((locale) => (
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
