#!/usr/bin/env bash
# Upload dist/ to All-Inkl / KAS via rsync.
# Requires: PREACTHUB_DEPLOY_HOST, PREACTHUB_DEPLOY_USER, PREACTHUB_DEPLOY_PATH
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOST="${PREACTHUB_DEPLOY_HOST:?Set PREACTHUB_DEPLOY_HOST (e.g. w014120b.kasserver.com)}"
USER="${PREACTHUB_DEPLOY_USER:?Set PREACTHUB_DEPLOY_USER}"
REMOTE="${PREACTHUB_DEPLOY_PATH:?Set PREACTHUB_DEPLOY_PATH (e.g. /www/htdocs/)}"

if [[ ! -d "$ROOT/dist" ]]; then
  echo "Missing dist/ — run PREACTHUB_SITE_URL=https://preacthub.com npm run build first" >&2
  exit 1
fi

echo "Deploying $ROOT/dist/ → ${USER}@${HOST}:${REMOTE}"
rsync -avz --delete "$ROOT/dist/" "${USER}@${HOST}:${REMOTE}"
echo "Done."
