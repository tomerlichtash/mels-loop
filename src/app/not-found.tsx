export default function NotFound() {
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
          <h1>404</h1>
          <p>Page not found</p>
          <a href="/en" style={{ color: "#3770c5" }}>
            Go Home
          </a>
        </div>
      </body>
    </html>
  );
}
