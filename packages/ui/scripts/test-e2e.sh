#!/usr/bin/env bash
#
# Build Storybook, serve it, run the story suite against it, clean up.
#
# `test-storybook` on its own needs a Storybook already running on 6006 and
# fails with a message suggesting `yarn` if there isn't one — which is the
# runner's own hardcoded text, not something this repo can configure. This
# wrapper removes that trap: one command, no prerequisite, no stray server left
# listening afterwards.
#
# CI runs this same script rather than repeating the sequence in YAML, so the
# thing you run locally and the thing that gates a PR cannot drift apart.
set -euo pipefail

PORT="${PORT:-6006}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$HERE"

server_pid=""
cleanup() {
	if [ -n "$server_pid" ] && kill -0 "$server_pid" 2>/dev/null; then
		kill "$server_pid" 2>/dev/null || true
		wait "$server_pid" 2>/dev/null || true
	fi
}
# Fires on success, failure and Ctrl-C alike, so a failed run does not leave the
# port occupied and make the next one fail for the wrong reason.
trap cleanup EXIT INT TERM

echo "==> Building Storybook"
pnpm build-storybook

echo "==> Serving storybook-static on :$PORT"
pnpm exec http-server storybook-static -p "$PORT" --silent &
server_pid=$!

# Polled rather than a fixed sleep: the build is cached sometimes and cold
# others, so any constant is either too short to be safe or too long to bear.
for _ in $(seq 1 30); do
	if curl -fsS -o /dev/null "http://127.0.0.1:$PORT"; then break; fi
	sleep 1
done
curl -fsS -o /dev/null "http://127.0.0.1:$PORT"

echo "==> Running the story suite"
pnpm exec test-storybook --url "http://127.0.0.1:$PORT" "$@"
