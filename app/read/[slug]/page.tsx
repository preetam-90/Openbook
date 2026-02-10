'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getChapterBySlug, getAllChapters, getChapterContent } from '@/lib/get-chapters';
import { ChevronLeft, ChevronRight, Home, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import ReactMarkdown from 'react-markdown';

interface ChapterPageProps {
  params: {
    slug: string;
  };
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const chapter = getChapterBySlug(params.slug);
  const allChapters = getAllChapters();
  const currentIndex = chapter ? allChapters.findIndex((c) => c.id === chapter.id) : -1;
  const previousChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (chapter) {
      setIsLoading(true);
      const fileContent = getChapterContent(chapter.file);
      setContent(fileContent);
      setIsLoading(false);
    }
  }, [chapter]);

  if (!mounted || !chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-700 dark:text-slate-300 mb-4">Chapter not found</p>
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-white/20 dark:border-slate-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <Home size={20} className="text-slate-700 dark:text-slate-300" />
            <span className="hidden sm:inline text-sm font-semibold text-slate-700 dark:text-slate-300">
              Bihar History
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-slate-700 dark:text-slate-300">
                Chapter {chapter.number}
              </span>
            </div>
            <ThemeToggle />
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="sm:hidden claymorphic-soft p-2 rounded-lg"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed sm:static inset-y-16 left-0 w-64 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-r border-white/20 dark:border-slate-700/20 overflow-y-auto z-30 transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
          }`}
        >
          <nav className="p-6 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Chapters</h3>
            {allChapters.map((ch) => (
              <Link
                key={ch.id}
                href={`/read/${ch.slug}`}
                className={`block px-4 py-2 rounded-lg transition-all duration-300 text-sm ${
                  ch.id === chapter.id
                    ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                Ch. {ch.number}: {ch.title}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full min-h-[calc(100vh-4rem)]">
          {/* Close sidebar on overlay click */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/20 sm:hidden z-20 mt-16"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="animate-spin">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full" />
                </div>
              </div>
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-4xl font-bold mt-0 mb-6 text-slate-900 dark:text-white" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-900 dark:text-white" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-2xl font-semibold mt-6 mb-3 text-slate-900 dark:text-white" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-4" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mb-4" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300 mb-4" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 italic text-slate-600 dark:text-slate-400 my-4" {...props} />
                    ),
                    table: ({ node, ...props }) => (
                      <table className="w-full border-collapse my-4 border border-slate-300 dark:border-slate-600" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 bg-slate-100 dark:bg-slate-800 font-semibold" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="border border-slate-300 dark:border-slate-600 px-4 py-2" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline" {...props} />
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </article>

          {/* Navigation Footer */}
          <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between gap-4">
            {previousChapter ? (
              <Link
                href={`/read/${previousChapter.slug}`}
                className="claymorphic-soft group flex-1 sm:flex-none px-6 py-3 rounded-xl flex items-center gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-x-2"
              >
                <ChevronLeft size={20} />
                <span className="hidden sm:inline">Previous</span>
              </Link>
            ) : (
              <div />
            )}

            <div className="text-center text-sm text-slate-600 dark:text-slate-400">
              Chapter {chapter.number} of {allChapters.length}
            </div>

            {nextChapter ? (
              <Link
                href={`/read/${nextChapter.slug}`}
                className="claymorphic-soft group flex-1 sm:flex-none px-6 py-3 rounded-xl flex items-center justify-end gap-2 hover:shadow-lg transition-all duration-300 hover:translate-x-2"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={20} />
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </main>
      </div>
    </div>
  );
}
