import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CHAPTERS_ORDER: { [key: string]: number } = {
  'front_matter': 0,
  'chapter_01': 1,
  'chapter_02': 2,
  'chapter_03_hindi': 3,
  'chapter_04_hindi': 4,
  'chapter_05_hindi': 5,
  'chapter_06_07_hindi': 6,
  'chapter_08_09_10_hindi': 7,
  'chapter_11_12_hindi': 8,
  'conclusion_bibliography_index_hindi': 9,
}

const CHAPTERS_FILE_MAP: { [key: string]: string } = {
  'front_matter': 'FRONT_MATTER',
  'chapter_01': 'CHAPTER_01',
  'chapter_02': 'CHAPTER_02',
  'chapter_03_hindi': 'CHAPTER_03_HINDI',
  'chapter_04_hindi': 'CHAPTER_04_HINDI',
  'chapter_05_hindi': 'CHAPTER_05_HINDI',
  'chapter_06_07_hindi': 'CHAPTER_06_07_HINDI',
  'chapter_08_09_10_hindi': 'CHAPTER_08_09_10_HINDI',
  'chapter_11_12_hindi': 'CHAPTER_11_12_HINDI',
  'conclusion_bibliography_index_hindi': 'CONCLUSION_BIBLIOGRAPHY_INDEX_HINDI',
}

interface SearchResult {
  id: string
  title: string
  order: number
  preview: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''

  if (!query) {
    return Response.json([])
  }

  try {
    const baseDir = process.cwd()
    const results: SearchResult[] = []

    // Search through all chapters
    for (const [id, fileName] of Object.entries(CHAPTERS_FILE_MAP)) {
      const filePath = path.join(baseDir, `${fileName}.md`)

      if (!fs.existsSync(filePath)) continue

      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)

      const title = (data.title as string) || extractTitleFromContent(content)
      const plainContent = stripMarkdown(content).toLowerCase()
      const titleLower = title.toLowerCase()

      // Search in title and content
      if (titleLower.includes(query) || plainContent.includes(query)) {
        const preview = extractPreview(plainContent, query)

        results.push({
          id,
          title,
          order: CHAPTERS_ORDER[id] || 0,
          preview,
        })
      }
    }

    // Sort by relevance (title matches first)
    results.sort((a, b) => {
      const aMatch = a.title.toLowerCase().includes(query)
      const bMatch = b.title.toLowerCase().includes(query)
      if (aMatch && !bMatch) return -1
      if (!aMatch && bMatch) return 1
      return a.order - b.order
    })

    return Response.json(results)
  } catch (error) {
    console.error('Search error:', error)
    return Response.json([], { status: 500 })
  }
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

function stripMarkdown(content: string): string {
  return content
    .replace(/#+\s+/g, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/!\[.+?\]\(.+?\)/g, '') // Remove images
    .replace(/\n+/g, ' ') // Remove line breaks
    .trim()
}

function extractPreview(content: string, query: string, length: number = 150): string {
  const index = content.indexOf(query)

  if (index === -1) {
    return content.substring(0, length) + (content.length > length ? '...' : '')
  }

  const start = Math.max(0, index - 50)
  const end = Math.min(content.length, index + length)

  let preview = content.substring(start, end).trim()
  if (start > 0) preview = '...' + preview
  if (end < content.length) preview = preview + '...'

  return preview
}
