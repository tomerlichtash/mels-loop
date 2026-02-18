"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <div>
          <h1>Something went wrong</h1>
          <p>An unexpected error occurred</p>
          <button onClick={reset} style={{ cursor: "pointer", padding: "8px 16px" }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
