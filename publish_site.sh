#!/bin/bash
set -euo pipefail

# =============================================
# Warriors Cricket Club - Publish Script
# 1. Builds Next.js static export
# 2. Commits and pushes to GitHub
# 3. Uploads to GoDaddy FTP using checksum-based logic
# =============================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ---- Configuration ----
GITHUB_REPO="https://github.com/MesonX-ai/warriorscricketclub.git"
FTP_HOST="mesonsoft.com"
FTP_PORT="21"
FTP_USER="mesonsoft@mesonsoft.com"
FTP_PASS='Rena!ssancE3'
FTP_REMOTE_DIR="/warriorscricketclub"

# ---- Step 1: Build Next.js ----
echo "=============================================="
echo " Step 1: Building Next.js static export..."
echo "=============================================="

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

npm run build

if [ ! -d "out" ]; then
  echo "ERROR: Build failed - 'out' directory not found"
  exit 1
fi

echo "Build complete. Output in ./out/"

# ---- Step 2: Git commit and push ----
echo ""
echo "=============================================="
echo " Step 2: Committing to GitHub..."
echo "=============================================="

# Initialize git if needed
if [ ! -d ".git" ]; then
  echo "Initializing git repository..."
  git init
  git remote add origin "$GITHUB_REPO" || true
else
  # Ensure remote exists
  if ! git remote | grep -q "^origin$"; then
    git remote add origin "$GITHUB_REPO"
  fi
fi

# Configure git user if not set
if ! git config user.email >/dev/null 2>&1; then
  git config user.email "mesonx@mesonsoft.com"
  git config user.name "MesonX"
fi

# Add all files (including public assets and Next.js source)
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  COMMIT_MSG="Update site $(date +%Y-%m-%d_%H%M%S)"
  git commit -m "$COMMIT_MSG"
fi

# Determine branch name (main or master)
BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || echo "main")

echo "Pushing to GitHub ($BRANCH)..."
git push -u origin "$BRANCH" || {
  echo "WARNING: Push to GitHub failed. The site is built locally in ./out/"
  echo "You can upload manually or fix the git remote and retry."
}

# ---- Step 3: Upload to GoDaddy with lftp mirror (checksum-based) ----
echo ""
echo "=============================================="
echo " Step 3: Uploading to GoDaddy (lftp mirror)..."
echo "=============================================="

# Check for required tools
if ! command -v lftp >/dev/null 2>&1; then
  echo "ERROR: lftp is not installed. Please install it first: brew install lftp"
  exit 1
fi

echo "Syncing ./out/ to $FTP_HOST:$FTP_REMOTE_DIR/ ..."
# lftp mirror --reverse uploads the local ./out build to the existing server folder.
#   --no-perms : avoids changing file permissions (safer on shared hosting).
#   --verbose  : prints each transferred file.
# Note: no --delete is used so unrelated existing server folders (e.g. .well-known,
#   cgi-bin) are preserved, and no new top-level folders are created.
lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST" -p "$FTP_PORT" -e "
  set ssl:verify-certificate no;
  set ftp:ssl-allow no;
  mirror --reverse --no-perms --verbose out/ $FTP_REMOTE_DIR/;
  bye
"

echo ""
echo "=============================================="
echo " PUBLISH COMPLETE"
echo "=============================================="
echo " GitHub: https://github.com/MesonX-ai/warriorscricketclub"
echo " GoDaddy: https://warriorscricketclub.us"
echo " Local build: $SCRIPT_DIR/out/"
echo "=============================================="