#!/bin/bash
set -e

# .env を読み込み
if [ -f .env ]; then
    set -a
    source .env
    set +a
fi

APPLE_SIGN_ID="3rd Party Mac Developer Application: $MY_NAME ($TEAM_ID)"
APPLE_INSTALLER_ID="3rd Party Mac Developer Installer: $MY_NAME ($TEAM_ID)"

# テンプレから実ファイルを生成
envsubst < ./src-tauri/Entitlements.plist.template > ./src-tauri/Entitlements.plist

# build
pnpm tauri build

# delete attr
xattr -rc ./src-tauri/target/release/bundle/macos/Sabakan.app

# Node.jsの署名
codesign \
  --force \
  --deep \
  --options runtime \
  --entitlements ./src-tauri/EntitlementsNode.plist \
  --timestamp \
  --sign "$APPLE_SIGN_ID" \
  ./src-tauri/target/release/bundle/macos/Sabakan.app/Contents/Resources/bin/node/bin/node

# cert
codesign \
  --force \
  --deep \
  --options runtime \
  --entitlements ./src-tauri/Entitlements.plist \
  --timestamp \
  -s "$APPLE_SIGN_ID" \
  ./src-tauri/target/release/bundle/macos/Sabakan.app

# バージョン取得
VERSION=$(jq -r '.version' src-tauri/tauri.conf.json)
PKG_PATH="src-tauri/target/Sabakan_${VERSION}.pkg"

# pkg
xcrun \
    productbuild \
    --sign "$APPLE_INSTALLER_ID" \
    --component "src-tauri/target/release/bundle/macos/Sabakan.app" /Applications "$PKG_PATH"

# check
# codesign -dv --verbose=4 ./src-tauri/target/release/bundle/macos/Sabakan.app
# spctl --assess --type execute --verbose ./src-tauri/target/release/bundle/macos/Sabakan.app
# spctl --assess --type execute --verbose ./src-tauri/target/release/bundle/macos/Sabakan.app/Contents/Resources/bin/node/bin/node
