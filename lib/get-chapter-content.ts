import fs from 'fs'
import path from 'path'

const chapterMap: Record<string, { file: string; title: string }> = {
  'chapter-1': { file: 'bihar_history_book_FRONT_MATTER.md', title: 'Introduction to Bihar' },
  'chapter-2': { file: 'bihar_history_book_CHAPTER_01.md', title: 'Medieval Period (1500-1700)' },
  'chapter-3': { file: 'bihar_history_book_CHAPTER_02.md', title: 'Colonial Era (1750-1850)' },
  'chapter-4': { file: 'bihar_history_book_CHAPTER_03_HINDI.md', title: 'Independence Movement' },
  'chapter-5': { file: 'bihar_history_book_CHAPTER_04_HINDI.md', title: 'Post-Independence Era' },
  'chapter-6': { file: 'bihar_history_book_CHAPTER_05_HINDI.md', title: 'Modern Bihar' },
  'chapter-7': { file: 'bihar_history_book_CHAPTER_06_07_HINDI.md', title: 'Culture & Arts' },
  'chapter-8': { file: 'bihar_history_book_CHAPTER_08_09_10_HINDI.md', title: 'Economy & Development' },
  'chapter-9': { file: 'bihar_history_book_CHAPTER_11_12_HINDI.md', title: 'Education & Society' },
  'chapter-10': { file: 'bihar_history_research.md', title: 'Future Vision' },
  'chapter-11': { file: 'BIHAR_HISTORY_BOOK_COMPLETE_INDEX.md', title: 'Conclusion & Index' },
}

export async function getChapterContent(chapterId: string) {
  try {
    const mapping = chapterMap[chapterId]
    if (!mapping) {
      return null
    }

    const filePath = path.join(process.cwd(), mapping.file)
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return null
    }

    const content = fs.readFileSync(filePath, 'utf-8')
    
    return {
      title: mapping.title,
      content: content,
      chapterId: chapterId,
    }
  } catch (error) {
    console.error('Error reading chapter:', error)
    return null
  }
}
