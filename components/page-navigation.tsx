'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const chapters = [
  { id: 'chapter-1', title: 'Introduction to Bihar' },
  { id: 'chapter-2', title: 'Medieval Period (1500-1700)' },
  { id: 'chapter-3', title: 'Colonial Era (1750-1850)' },
  { id: 'chapter-4', title: 'Independence Movement' },
  { id: 'chapter-5', title: 'Post-Independence Era' },
  { id: 'chapter-6', title: 'Modern Bihar' },
  { id: 'chapter-7', title: 'Culture & Arts' },
  { id: 'chapter-8', title: 'Economy & Development' },
  { id: 'chapter-9', title: 'Education & Society' },
  { id: 'chapter-10', title: 'Future Vision' },
  { id: 'chapter-11', title: 'Conclusion & Index' },
]

interface PageNavigationProps {
  currentChapter: string
}

export function PageNavigation({ currentChapter }: PageNavigationProps) {
  const currentIndex = chapters.findIndex(ch => ch.id === currentChapter)
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null

  return (
    <div className="mt-12 flex gap-6">
      {prevChapter ? (
        <Link
          href={`/read/${prevChapter.id}`}
          className="flex-1 claymorphic p-6 hover:shadow-lg transition-smooth group"
        >
          <div className="flex items-center gap-3">
            <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:-translate-x-1 transition-smooth" />
            <div className="text-left">
              <p className="text-xs text-slate-500 dark:text-slate-500 uppercase">Previous Chapter</p>
              <p className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-smooth">
                {prevChapter.title}
              </p>
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex-1"></div>
      )}

      {nextChapter ? (
        <Link
          href={`/read/${nextChapter.id}`}
          className="flex-1 claymorphic p-6 hover:shadow-lg transition-smooth group"
        >
          <div className="flex items-center justify-end gap-3">
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-500 uppercase">Next Chapter</p>
              <p className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-smooth">
                {nextChapter.title}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:translate-x-1 transition-smooth" />
          </div>
        </Link>
      ) : (
        <div className="flex-1"></div>
      )}
    </div>
  )
}
