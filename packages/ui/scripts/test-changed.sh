#!/bin/bash
# Run e2e tests only for components with changes relative to the base branch.
# Falls back to running ALL specs when shared files (tokens, themes, globals) change.
# Usage: sh scripts/test-changed.sh [base-branch]
set -e

BASE="${1:-master}"
CHANGED=$(git diff --name-only "$BASE" -- src/)

if [ -z "$CHANGED" ]; then
  echo "No changes in src/."
  exit 0
fi

# Shared paths that affect all components — any change here runs the full suite
SHARED_PATTERNS="src/styles/ src/color-scheme/ src/css-modules.d.ts"

RUN_ALL=false
for pattern in $SHARED_PATTERNS; do
  if echo "$CHANGED" | grep -q "^$pattern"; then
    RUN_ALL=true
    break
  fi
done

if [ "$RUN_ALL" = true ]; then
  echo "Shared files changed — running all specs."
  sh scripts/docker-e2e.sh
  exit 0
fi

# Warn about deleted components with orphaned screenshots
DELETED_DIRS=$(git diff --diff-filter=D --name-only "$BASE" -- src/ \
  | xargs -I{} dirname {} \
  | sort -u \
  | while read -r dir; do
      SCREENSHOT_DIR="e2e/__screenshots__/${dir}"
      [ -d "$SCREENSHOT_DIR" ] && echo "$SCREENSHOT_DIR"
    done)

if [ -n "$DELETED_DIRS" ]; then
  echo "Warning: orphaned screenshots from deleted components:"
  echo "$DELETED_DIRS"
  echo "Run 'rm -rf <dir>' to clean up."
  echo ""
fi

# Find spec files in directories that have changed files
SPECS=$(echo "$CHANGED" \
  | xargs -I{} dirname {} \
  | sort -u \
  | while read -r dir; do
      [ -d "$dir" ] && find "$dir" -maxdepth 1 -name '*.spec.ts' 2>/dev/null
    done)

if [ -z "$SPECS" ]; then
  echo "No changed components with specs found."
  exit 0
fi

echo "Running specs for changed components:"
echo "$SPECS"
echo ""

sh scripts/docker-e2e.sh $SPECS
