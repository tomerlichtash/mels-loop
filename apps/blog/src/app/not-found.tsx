import styles from "./fallback.module.css";

export default function NotFound() {
  return (
    <html lang="en">
      <body className={styles.body}>
        <div>
          <h1>404</h1>
          <p>Page not found</p>
          <a href="/en/posts" className={styles.link}>
            Go to Blog
          </a>
        </div>
      </body>
    </html>
  );
}
