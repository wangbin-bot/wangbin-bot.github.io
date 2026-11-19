import { defineConfig } from 'vitepress'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateSidebar } from './sidebar.mjs'

const docsRoot = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(docsRoot, '../..')

export default defineConfig({
  title: '寻林写彡 | 攻防武库与技术手记',
  description: '记录网络安全课程实战、漏洞复现、流量研判与自动化响应。',
  lang: 'zh-CN',
  base: '/',
  cacheDir: path.join(projectRoot, '.vitepress-cache'),
  outDir: path.join(projectRoot, '.vitepress-out'),
  appearance: 'dark',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: undefined,
    siteTitle: '寻林写彡',
    nav: [
      { text: '首页', link: '/' },
      { text: '渗透攻防武库', link: '/pentest/README' },
      { text: '简历素材总表', link: '/resume-arsenal' },
      { text: 'CSDN 历史文章精选', link: '/articles/README' },
      { text: '技术折腾与随笔', link: '/notes/README' },
      { text: '关于我', link: 'https://github.com/wangbin-bot' }
    ],
    sidebar: await generateSidebar(path.join(projectRoot, 'docs')),
    search: {
      provider: 'local'
    },
    editLink: undefined,
    footer: {
      message: '专注技术研究，所有实战内容仅用于授权环境与安全学习。',
      copyright: 'Copyright © 寻林写彡'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: '本页目录'
    },
    lastUpdated: {
      text: '最后更新于'
    }
  }
})
