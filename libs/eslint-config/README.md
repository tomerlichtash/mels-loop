# @mels-loop/eslint-config

Shared ESLint flat configs for the monorepo.

## Configs

| Entry point | Description |
|---|---|
| `@mels-loop/eslint-config/base` | TypeScript + import sorting + Prettier compat |
| `@mels-loop/eslint-config/react` | Base + React Hooks rules |
| `@mels-loop/eslint-config/next` | React + Next.js plugin rules |

## Usage

```js
// eslint.config.mjs
import base from '@mels-loop/eslint-config/base';

export default [...base];
```
