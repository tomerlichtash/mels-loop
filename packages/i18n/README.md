# @mels-loop/i18n

Framework-agnostic internationalization utilities — locale resolution, translation provider, and dictionary helpers.

## Exports

| Entry point | Description |
|---|---|
| `@mels-loop/i18n/config` | `defineI18n()`, `getLocales()`, `getDefaultLocale()`, `getDirection()`, `isValidLocale()` |
| `@mels-loop/i18n/client` | `I18nProvider` and `useTranslation()` hook (React) |
| `@mels-loop/i18n/middleware` | `resolveLocale()` — framework-agnostic locale routing |
| `@mels-loop/i18n/locale-cookie` | `setLocaleCookie()` — client-side locale persistence |
| `@mels-loop/i18n/dict` | `dictGet()` — dot-notation key lookup in nested dictionaries |

## Usage

### 1. Define configuration

```ts
import { defineI18n } from '@mels-loop/i18n/config';

export const i18n = defineI18n({
  locales: ['en', 'he'],
  defaultLocale: 'en',
  direction: { he: 'rtl' },
});
```

### 2. Locale routing (middleware)

`resolveLocale()` returns a plain result — your framework adapter maps it to a response:

```ts
import { resolveLocale } from '@mels-loop/i18n/middleware';

const result = resolveLocale({
  pathname: req.pathname,
  cookies: { NEXT_LOCALE: req.cookies.get('NEXT_LOCALE') },
  acceptLanguage: req.headers.get('accept-language'),
});

// result.action: 'skip' | 'redirect' | 'rewrite'
```

### 3. Translation provider (React)

```tsx
import { I18nProvider, useTranslation } from '@mels-loop/i18n/client';

// Wrap your app
<I18nProvider locale="en" messages={messages}>
  <App />
</I18nProvider>

// In components
const { t, locale } = useTranslation();
t('nav.home'); // => "Home"
```

## Design

- **No framework dependency** — the middleware returns a discriminated union (`skip | redirect | rewrite`), not framework-specific responses
- **Config-driven** — call `defineI18n()` once at startup; all utilities read from it
- **RTL support** — `getDirection(locale)` returns `'ltr'` or `'rtl'` based on config

## Scripts

```sh
pnpm build       # tsc to dist/
pnpm lint        # eslint
pnpm lint:fix    # eslint --fix
```

## Peer dependencies

- `react` ^19.0.0
