import fs from 'fs'
import path from 'path'
import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

export interface Chapter {
  id: string
  title: string
  order: number
  content: string
  htmlContent: string
  path: string
}

export interface Book {
  chapters: Chapter[]
  tableOfContents: Array<{
    id: string
    title: string
    order: number
  }>
}

const CHAPTERS_ORDER = [
  'FRONT_MATTER',
  'CHAPTER_01',
  'CHAPTER_02',
  'CHAPTER_03_HINDI',
  'CHAPTER_04_HINDI',
  'CHAPTER_05_HINDI',
  'CHAPTER_06_07_HINDI',
  'CHAPTER_08_09_10_HINDI',
  'CHAPTER_11_12_HINDI',
  'CONCLUSION_BIBLIOGRAPHY_INDEX_HINDI',
]

export function getChapters(): Chapter[] {
  const baseDir = process.cwd()
  const chapters: Chapter[] = []

  CHAPTERS_ORDER.forEach((chapterFile, index) => {
    const filePath = path.join(baseDir, `${chapterFile}.md`)

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)

      const title = (data.title as string) || extractTitleFromContent(content)

      chapters.push({
        id: chapterFile.toLowerCase(),
        title,
        order: index,
        content,
        htmlContent: md.render(content),
        path: filePath,
      })
    }
  })

  return chapters
}

export function getChapter(id: string): Chapter | null {
  const chapters = getChapters()
  return chapters.find((ch) => ch.id === id) || null
}

export function getTableOfContents(): Array<{
  id: string
  title: string
  order: number
}> {
  const chapters = getChapters()
  return chapters.map((ch) => ({
    id: ch.id,
    title: ch.title,
    order: ch.order,
  }))
}

function extractTitleFromContent(content: string): string {
  const lines = content.split('\n')
  for (const line of lines) {
    if (line.startsWith('#')) {
      return line.replace(/^#+\s+/, '').trim()
    }
  }
  return 'Untitled'
}

export function getNavigationLinks(currentId: string): {
  prev: Chapter | null
  next: Chapter | null
} {
  const chapters = getChapters()
  const currentIndex = chapters.findIndex((ch) => ch.id === currentId)

  return {
    prev: currentIndex > 0 ? chapters[currentIndex - 1] : null,
    next: currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null,
  }
}
