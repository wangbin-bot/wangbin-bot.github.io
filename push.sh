#!/usr/bin/env bash
set -euo pipefail

if ! git rev-parse --show-toplevel >/dev/null 2>&1; then
  echo "错误：当前目录不在 Git 仓库中。请先克隆 GitHub 仓库，或在此目录初始化并配置远程仓库。" >&2
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "错误：未配置 origin 远程仓库。请先运行 git remote add origin <GitHub 仓库地址>。" >&2
  exit 1
fi

git add -A
if git diff --cached --quiet; then
  echo "没有待提交的文件。"
  exit 0
fi

commit_message="${*:-更新站点内容 $(date '+%Y-%m-%d %H:%M:%S')}"
git commit -m "$commit_message"
git push -u origin main
