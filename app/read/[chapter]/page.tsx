'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { ChapterReader } from '@/components/chapter-reader'
import { PageNavigation } from '@/components/page-navigation'
import { getChapterContent } from '@/lib/get-chapter-content'

interface ChapterPageProps {
  params: Promise<{
    chapter: string
  }>
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const [chapter, setChapter] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [chapterData, setChapterData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadChapter() {
      try {
        const resolvedParams = await params
        setChapter(resolvedParams.chapter)
        const content = await getChapterContent(resolvedParams.chapter)
        if (isMounted) {
          if (!content) {
            setError('Chapter not found')
            return
          }
          setChapterData(content)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load chapter')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadChapter()

    return () => {
      isMounted = false
    }
  }, [params])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading chapter...</p>
        </div>
      </div>
    )
  }

  if (error || !chapterData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Chapter not found</h1>
          <p className="text-slate-600 dark:text-slate-400">The chapter you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <ChapterReader content={chapterData.content} title={chapterData.title} />
        <PageNavigation currentChapter={chapter || ''} />
      </div>
    </div>
  )
}
