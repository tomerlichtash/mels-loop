import styles from "./fallback.module.css";

export default function NotFound() {
  return (
    <html lang="en">
      <body className={styles.body}>
        <div>
          <h1>404</h1>
          <p>Page not found</p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/en" className={styles.link}>
            Go Home
          </a>
        </div>
      </body>
    </html>
  );
}
