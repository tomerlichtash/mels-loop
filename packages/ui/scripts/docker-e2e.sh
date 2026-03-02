#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
UI_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$UI_DIR/../.." && pwd)"

IMAGE="mels-loop-ui-e2e"

# Build the image if it doesn't exist or Dockerfile changed
docker build -q -t "${IMAGE}" "${SCRIPT_DIR}"

# Filter out bare "--" separators inserted by pnpm
ARGS=()
for arg in "$@"; do
  [ "$arg" != "--" ] && ARGS+=("$arg")
done

docker run --rm \
  --cpus="$(nproc 2>/dev/null || sysctl -n hw.ncpu)" \
  -e DOCKER=1 \
  -v "${REPO_ROOT}":/work \
  -w /work/packages/ui \
  "${IMAGE}" \
  "${ARGS[@]}"
