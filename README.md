# 寻林写彡 | 攻防武库与技术手记

基于 VitePress 的个人技术站点，包含渗透攻防课程记录、文章归档、本地全文搜索和 GitHub Pages 自动部署。

## 本地运行

需要 Node.js 20 或更高版本。

```sh
npm ci
npm run docs:dev
```

本地生产构建与预览：

```sh
npm run docs:build
npm run docs:preview
```

## 内容归档

- 在 `docs/pentest/` 中按课程或主题创建目录，放入 `README.md` 和同目录配套脚本。
- 在 `docs/articles/` 中放入独立 Markdown 文章，或按主题建立目录。
- 在 `docs/notes/` 中归档其他技术教程、考证笔记和个人随笔。
- 侧栏在 VitePress 读取配置时自动扫描这些目录，并以 Markdown 首标题生成链接名称。

## GitHub Pages

将项目推送到 GitHub 仓库的 `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并发布 Pages。到仓库的 **Settings → Pages** 将发布来源设为 **GitHub Actions**。构建会根据仓库名称自动设置项目站点的 URL 前缀。

在克隆后的仓库目录运行 `./push.sh "提交说明"`，或在 Windows 运行 `push.bat 提交说明`，即可提交并推送到 `origin/main`。首次使用前需先克隆仓库，并确保已配置 Git 身份和 `origin` 远程仓库。
