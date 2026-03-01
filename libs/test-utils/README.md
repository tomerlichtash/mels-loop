# @mels-loop/test-utils

Shared test utilities for E2E and integration tests.

## Exports

| Entry point | Description |
|---|---|
| `@mels-loop/test-utils/i18n` | `t(locale, key)` — translation lookup for test assertions |
| `@mels-loop/test-utils/locale` | `locales`, `defaultLocale`, `getLocalePath()` |

## Usage

```ts
import { t } from '@mels-loop/test-utils/i18n';
import { getLocalePath } from '@mels-loop/test-utils/locale';

// Get a translated string for assertions
const label = t('en', 'contact.labelName'); // => "Your Name"

// Build a locale-prefixed URL
const url = getLocalePath('he', '/glossary'); // => "/he/glossary"
```
