/*
 * Publishes the page scrollbar's width as --ml-scrollbar-width, so full-bleed
 * elements can span the viewport without running underneath it.
 *
 * CSS cannot measure this on its own. The usual `calc(100vw - 100%)` trick
 * only holds on an element that is exactly the client width, and a custom
 * property carrying a percentage resolves that percentage against whatever
 * element *consumes* it — so the value would come out wrong everywhere it was
 * actually used.
 *
 * Inline and blocking, alongside ColorSchemeScript, so the value lands before
 * first paint instead of after a visible reflow.
 *
 * Expect this to report 0 on most platforms: PageScrollbar hides the native
 * bar wherever there is a fine pointer, and touch platforms overlay theirs. It
 * is kept for the ones that still reserve a column, where the full-bleed
 * breakouts would otherwise overflow. A constant 0 is the healthy case, not a
 * sign the script is doing nothing.
 */
const script = `
(function() {
  try {
    var el = document.documentElement;
    var set = function() {
      var w = window.innerWidth - el.clientWidth;
      el.style.setProperty("--ml-scrollbar-width", (w > 0 ? w : 0) + "px");
    };
    // Runs in <head>, where the page has no content yet and therefore no
    // scrollbar — measuring only here always yields 0. Re-measure once there
    // is a document to measure, and whenever its height crosses the point
    // where the scrollbar appears or disappears.
    set();
    document.addEventListener("DOMContentLoaded", function() {
      set();
      if (typeof ResizeObserver === "function" && document.body) {
        new ResizeObserver(set).observe(document.body);
      }
    });
    window.addEventListener("load", set);
    window.addEventListener("resize", set, { passive: true });
  } catch (e) {}
})();
`;

export function ScrollbarWidthScript() {
	return (
		<script
			dangerouslySetInnerHTML={{ __html: script }}
			suppressHydrationWarning
		/>
	);
}
