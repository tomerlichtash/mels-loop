/**
 * Plain (non-module) stylesheets, imported for their side effect.
 *
 * Next declares `*.module.css` — typed as a class map — but nothing for a
 * bare `import './globals.css'`. That is invisible under the default settings
 * and an error under `noUncheckedSideEffectImports`, which is why the editor
 * reported TS2882 on the root layout's six stylesheet imports while
 * `tsc --noEmit` said nothing.
 *
 * `*.module.css` is the more specific pattern, so Next's typed declaration
 * still wins for CSS modules; this only covers the bare ones.
 */
declare module '*.css';
