#!/usr/bin/env bash
# Usage: deploy/deploy.sh <server-ip>   (run from the website folder)
# Copies the site to the server, installs dependencies, builds and restarts it.
set -euo pipefail
HOST="$1"; KEY="${SSH_KEY:-$HOME/.ssh/minutebooks_hetzner}"
SSH="ssh -i $KEY -o StrictHostKeyChecking=accept-new deploy@$HOST"
rsync -az --delete -e "ssh -i $KEY -o StrictHostKeyChecking=accept-new" \
  --exclude node_modules --exclude .next --exclude .env.local --exclude '.env*.local' --exclude tsconfig.tsbuildinfo \
  ./ "deploy@$HOST:/srv/minutebooks-website/"
$SSH 'cd /srv/minutebooks-website && touch .env.production.local && npm ci --no-audit --no-fund && npm run build && sudo /bin/systemctl restart minutebooks-website'
$SSH 'sleep 3; curl -s -o /dev/null -w "site responds: %{http_code}\n" http://127.0.0.1:3000/'
