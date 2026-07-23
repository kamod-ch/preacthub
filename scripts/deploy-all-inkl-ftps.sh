#!/usr/bin/env bash
# Upload dist/ to All-Inkl / KAS via FTPS (parallel lftp mirror).
# Requires: FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_REMOTE_DIR
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOST="${FTP_HOST:?Set FTP_HOST (e.g. w014120b.kasserver.com)}"
USER="${FTP_USER:?Set FTP_USER}"
PASSWORD="${FTP_PASSWORD:?Set FTP_PASSWORD}"
REMOTE="${FTP_REMOTE_DIR:?Set FTP_REMOTE_DIR (e.g. /www/htdocs/)}"
PARALLEL="${FTP_PARALLEL:-5}"

if [[ ! -d "$ROOT/dist" ]]; then
  echo "Missing dist/ — build first or download the CI artifact" >&2
  exit 1
fi

echo "Deploying $ROOT/dist/ → ftps://${HOST}${REMOTE} (${PARALLEL} parallel transfers)"

lftp -u "$USER","$PASSWORD" "ftp://$HOST" <<EOF
set ftp:ssl-force true
set ftp:ssl-protect-data true
set ssl:verify-certificate true
set mirror:parallel-transfer-count ${PARALLEL}
set net:connection-limit ${PARALLEL}
mirror -R --delete dist/ "$REMOTE"
bye
EOF

echo "Done."
