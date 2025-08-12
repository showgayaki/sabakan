@echo off
setlocal

REM Sabakan 用 BrowserSync 起動スクリプト (Windows)
set NODE_EXEC=%~dp0\node\node.exe
set BIN_JS=%~dp0\node\node_modules\browser-sync\dist\bin.js

echo [INFO] Launching BrowserSync on Windows
echo [INFO] Using BIN_JS=%BIN_JS%
echo [INFO] Using bundled Node: %NODE_EXEC%

"%NODE_EXEC%" "%BIN_JS%" %*
endlocal
