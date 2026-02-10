'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Menu, X, Home } from 'lucide-react'
import { usePathname } from 'next/navigation'

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

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-20 right-4 z-40 p-2 claymorphic hover:shadow-lg transition-smooth"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-screen bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-r border-white/40 dark:border-slate-700/40 overflow-y-auto transition-all duration-300 ${
          isOpen ? 'left-0' : '-left-64 md:left-0'
        } z-30`}
      >
        <div className="p-6 sticky top-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-white/40 dark:border-slate-700/40">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">Chapters</span>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
              pathname === '/'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </Link>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <p className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase">
              Chapters
            </p>
            {chapters.map((chapter) => {
              const isActive = pathname.includes(chapter.id)
              return (
                <Link
                  key={chapter.id}
                  href={`/read/${chapter.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm transition-smooth ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {chapter.title}
                </Link>
              )
            })}
          </div>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-20"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}
