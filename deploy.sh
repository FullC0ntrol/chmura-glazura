#!/usr/bin/env bash
set -euo pipefail

echo "[1/4] Git pull…"
git pull --rebase

echo "[2/4] Install deps…"
npm ci

echo "[3/4] Build…"
npm run build

echo "[4/4] Sync → /var/www/chmura-glazura.pl/public …"
sudo rsync -a --delete dist/ /var/www/chmura-glazura.pl/public/

echo "Done ✅"
