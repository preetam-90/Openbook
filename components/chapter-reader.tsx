'use client'

import { useState } from 'react'
import { BookmarkPlus, BookmarkCheck, Share2, Maximize2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface ChapterReaderProps {
  content: string
  title: string
}

export function ChapterReader({ content, title }: ChapterReaderProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <div className="mb-12">
      {/* Reader Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Continue your journey through Bihar's history
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-3 claymorphic hover:shadow-lg transition-smooth"
            title="Bookmark chapter"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            ) : (
              <BookmarkPlus className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            )}
          </button>
          <button
            className="p-3 claymorphic hover:shadow-lg transition-smooth"
            title="Share chapter"
          >
            <Share2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-3 claymorphic hover:shadow-lg transition-smooth"
            title="Fullscreen"
          >
            <Maximize2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>

      {/* Reader Content */}
      <article className="chapter-content bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/40 dark:border-slate-800/40">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mt-0 mb-6" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />,
            p: ({ node, ...props }) => <p className="text-lg leading-relaxed mb-4" {...props} />,
            ul: ({ node, ...props }) => <ul className="ml-6 mb-4 list-disc" {...props} />,
            ol: ({ node, ...props }) => <ol className="ml-6 mb-4 list-decimal" {...props} />,
            li: ({ node, ...props }) => <li className="mb-2" {...props} />,
            a: ({ node, ...props }) => <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />,
            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 py-2 italic" {...props} />,
            table: ({ node, ...props }) => <table className="w-full border-collapse my-4" {...props} />,
            th: ({ node, ...props }) => <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 bg-slate-100 dark:bg-slate-800 font-semibold" {...props} />,
            td: ({ node, ...props }) => <td className="border border-slate-300 dark:border-slate-600 px-4 py-2" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </article>

      {/* Reading Progress */}
      <div className="mt-8 flex items-center gap-4">
        <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 w-1/3"></div>
        </div>
        <span className="text-sm text-slate-600 dark:text-slate-400 font-semibold">
          33% Complete
        </span>
      </div>
    </div>
  )
}
