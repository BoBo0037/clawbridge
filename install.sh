#!/bin/bash

# ClawBridge One-Liner Installer
# Usage: curl -sL https://raw.githubusercontent.com/dreamwing/clawbridge/master/install.sh | bash

set -e

echo "🌊 ClawBridge Installer"
echo "-----------------------"

TARGET_DIR="skills/clawbridge"
NEEDS_BUILD=true

# 1. Check Directory & Update
if [ -d "$TARGET_DIR" ]; then
    echo "ℹ️  Updating existing installation..."
    cd "$TARGET_DIR"
    
    # Stash local changes to config (if any, though .env is ignored)
    git stash >/dev/null 2>&1 || true
    
    echo "⬇️  Fetching updates..."
    git fetch --all --tags --prune
    
    # Try to find latest v* tag
    LATEST_TAG=$(git tag -l "v*" | sort -V | tail -n1)
    
    if [ ! -z "$LATEST_TAG" ]; then
        # Check current tag
        CURRENT_TAG=$(git describe --tags --exact-match 2>/dev/null || echo "none")
        
        if [ "$CURRENT_TAG" == "$LATEST_TAG" ]; then
            echo "✅ Already on latest version ($LATEST_TAG). Skipping update."
            NEEDS_BUILD=false
        else
            echo "🔖 Found new version: $LATEST_TAG (Current: $CURRENT_TAG)"
            echo "🔄 Switching to release $LATEST_TAG..."
            git checkout "tags/$LATEST_TAG"
        fi
    else
        echo "⚠️  No release tags found. Using master branch..."
        git checkout master
        git pull origin master
    fi
else
    echo "⬇️  Cloning repository..."
    mkdir -p skills
    git clone https://github.com/dreamwing/clawbridge.git "$TARGET_DIR"
    cd "$TARGET_DIR"
    
    # Post-clone: Checkout tag if available
    LATEST_TAG=$(git tag -l "v*" | sort -V | tail -n1)
    if [ ! -z "$LATEST_TAG" ]; then
        echo "🔖 Checkout release $LATEST_TAG..."
        git checkout "tags/$LATEST_TAG"
    fi
fi

# 2. Install Deps (Conditional)
if [ "$NEEDS_BUILD" = true ]; then
    echo "📦 Installing dependencies..."
    # Note: We are already inside TARGET_DIR
    if [ -f "package-lock.json" ]; then
        npm ci --production --silent
    else
        npm install --production --silent
    fi
else
    echo "⏭️  Skipping dependency install (Version match)."
fi

# 3. Run Setup
echo "🚀 Configuring..."
chmod +x setup.sh
# Force quick mode for zero-friction
./setup.sh --quick
