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

# ---- Step 3: Upload to GoDaddy with checksum logic ----
echo ""
echo "=============================================="
echo " Step 3: Uploading to GoDaddy (checksum-based)..."
echo "=============================================="

# Check for required tools
if ! command -v lftp >/dev/null 2>&1; then
  echo "ERROR: lftp is not installed. Please install it first: brew install lftp"
  exit 1
fi

TMPDIR=$(mktemp -d)
LOCAL_MANIFEST="$TMPDIR/local_manifest.txt"
REMOTE_MANIFEST="$TMPDIR/remote_checksums.txt"
FILES_TO_UPLOAD="$TMPDIR/files_to_upload.txt"
LFTP_CMDS="$TMPDIR/lftp_cmds.txt"

# Generate local manifest: find all files in out/, compute SHA-256 checksums
# Keep ./ prefix so awk FS="  " can parse correctly even with spaces in filenames
cd out
find . -type f -print0 | xargs -0 shasum -a 256 | sort > "$LOCAL_MANIFEST"
cd ..

echo "Local manifest generated: $(wc -l < "$LOCAL_MANIFEST") files"

# Download remote manifest if it exists
echo "Downloading remote manifest (if exists)..."
lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST" -p "$FTP_PORT" <<'LFTP' || true
get /warriorscricketclub/checksums.txt /tmp/remote_checksums.txt
bye
LFTP

if [ -f "/tmp/remote_checksums.txt" ]; then
  echo "Remote manifest found."
  cp "/tmp/remote_checksums.txt" "$REMOTE_MANIFEST"
else
  echo "No remote manifest found. Will upload all files."
  touch "$REMOTE_MANIFEST"
fi

# Compare and generate upload list
UPLOADED=0
SKIPPED=0

> "$FILES_TO_UPLOAD"

while IFS= read -r line; do
  # Parse using awk with two-space field separator (shasum output format)
  checksum=$(echo "$line" | awk -F'  ' '{print $1}')
  filepath=$(echo "$line" | awk -F'  ' '{print $2}')

  # Get remote checksum using awk with two-space field separator
  remote_checksum=$(awk -v fp="$filepath" 'BEGIN{FS="  "} $2 == fp {print $1}' "$REMOTE_MANIFEST")

  if [ "$checksum" = "$remote_checksum" ]; then
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  echo "$filepath" >> "$FILES_TO_UPLOAD"
  UPLOADED=$((UPLOADED + 1))
done < "$LOCAL_MANIFEST"

echo "Files to upload: $UPLOADED, Files skipped: $SKIPPED"

# Generate lftp commands and execute in a single session
{
  echo "set ftp:ssl-allow no"
  while IFS= read -r filepath; do
    remote_dir=$(dirname "$FTP_REMOTE_DIR/$filepath")
    echo "mkdir -p $remote_dir"
    echo "put out/$filepath -o $FTP_REMOTE_DIR/$filepath"
  done < "$FILES_TO_UPLOAD"
  echo "put $LOCAL_MANIFEST -o $FTP_REMOTE_DIR/checksums.txt"
  echo "bye"
} > "$LFTP_CMDS"

echo "Uploading files to GoDaddy..."
lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST" -p "$FTP_PORT" -f "$LFTP_CMDS"

echo ""
echo "Upload complete: $UPLOADED files uploaded, $SKIPPED files skipped (unchanged)"

# Cleanup
rm -rf "$TMPDIR"
rm -f "/tmp/remote_checksums.txt"

echo ""
echo "=============================================="
echo " PUBLISH COMPLETE"
echo "=============================================="
echo " GitHub: https://github.com/MesonX-ai/warriorscricketclub"
echo " GoDaddy: https://warriorscricketclub.us"
echo " Local build: $SCRIPT_DIR/out/"
echo "=============================================="