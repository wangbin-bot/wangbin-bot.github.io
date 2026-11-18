import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

function titleFrom(markdown, fallback) {
  const frontmatter = markdown.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/)
  const frontmatterTitle = frontmatter?.[1].match(/^title:\s*["']?(.*?)["']?\s*$/m)?.[1]?.trim()
  if (frontmatterTitle) return frontmatterTitle

  const heading = markdown.match(/^#\s+(.+)\s*$/m)
  return heading?.[1]?.trim() || fallback
}

async function scanDirectory(root, relative = '') {
  const absolute = path.join(root, relative)
  const entries = await readdir(absolute, { withFileTypes: true })
  const directories = entries.filter((entry) => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.md')).sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
  const items = []

  for (const entry of directories) {
    const nestedPath = path.posix.join(relative, entry.name)
    const nestedItems = await scanDirectory(root, nestedPath)
    const directoryIndex = path.join(absolute, entry.name, 'index.md')
    try {
      const markdown = await readFile(directoryIndex, 'utf8')
      items.push({
        text: titleFrom(markdown, entry.name),
        link: `/${path.basename(root)}/${nestedPath}/`,
        collapsed: false,
        items: nestedItems,
      })
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
      items.push({ text: entry.name, collapsed: false, items: nestedItems })
    }
  }

  const hasIndex = files.some((entry) => entry.name === 'index.md')
  for (const entry of files) {
    if (hasIndex && (entry.name === 'index.md' || entry.name === 'README.md')) continue
    const filePath = path.posix.join(relative, entry.name)
    const markdown = await readFile(path.join(root, relative, entry.name), 'utf8')
    const slug = filePath.replace(/\.md$/, '')
    const fallback = entry.name.replace(/\.md$/, '')
    items.push({ text: titleFrom(markdown, fallback), link: `/${path.basename(root)}/${slug}` })
  }

  return items
}

export async function generateSidebar(docsRoot) {
  const sidebar = {}

  for (const section of ['pentest', 'articles', 'notes']) {
    const sectionRoot = path.join(docsRoot, section)
    sidebar[`/${section}/`] = await scanDirectory(sectionRoot)
  }

  return sidebar
}
