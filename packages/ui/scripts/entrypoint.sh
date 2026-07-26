#!/bin/bash
set -e

npx playwright test --config playwright.config.ts "$@"
