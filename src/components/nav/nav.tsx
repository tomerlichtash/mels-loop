import Link from 'next/link';
import { classes } from './nav.st.css'

// const links = [
//   { href: 'https://github.com/vercel/next.js', label: 'GitHub' },
//   { href: 'https://nextjs.org/docs', label: 'Docs' },
// ];

export const Nav = (): JSX.Element => {
  return (
    <nav className={classes.root}>
      <ul className="flex items-center justify-between p-8">
        <li>
          <Link href="/">
            <a className="text-blue-500 no-underline text-accent-1 dark:text-blue-300">
              Home
            </a>
          </Link>
          <Link href="/about">
            <a className="text-blue-500 no-underline text-accent-1 dark:text-blue-300">
              About
            </a>
          </Link>
        </li>
        {/* <ul className="flex items-center justify-between space-x-4">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <a href={href} className="no-underline btn-blue">
                {label}
              </a>
            </li>
          ))}
        </ul> */}
      </ul>
    </nav>
  );
};

export default Nav;
