const script = `
(function() {
  try {
    var stored = localStorage.getItem("color-scheme");
    if (stored === "dark" || stored === "light") {
      document.documentElement.dataset.colorScheme = stored;
    } else {
      var dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.dataset.colorScheme = dark ? "dark" : "light";
    }
  } catch (e) {}
})();
`;

export function ColorSchemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
