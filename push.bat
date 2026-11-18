@echo off
setlocal

git rev-parse --show-toplevel >nul 2>&1
if errorlevel 1 (
  echo 错误：当前目录不在 Git 仓库中。请先克隆 GitHub 仓库，或在此目录初始化并配置远程仓库。
  exit /b 1
)

git remote get-url origin >nul 2>&1
if errorlevel 1 (
  echo 错误：未配置 origin 远程仓库。请先运行 git remote add origin ^<GitHub 仓库地址^>。
  exit /b 1
)

git add -A
if errorlevel 1 exit /b 1

git diff --cached --quiet
if not errorlevel 1 (
  echo 没有待提交的文件。
  exit /b 0
)

set "commit_message=%*"
if "%commit_message%"=="" set "commit_message=更新站点内容 %DATE% %TIME%"
git commit -m "%commit_message%"
if errorlevel 1 exit /b 1
git push -u origin main
if errorlevel 1 exit /b 1

endlocal
