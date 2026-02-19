"use client";

import styles from "./fallback.module.css";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <div>
          <h1>Something went wrong</h1>
          <p>An unexpected error occurred</p>
          <button onClick={reset} className={styles.button}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
