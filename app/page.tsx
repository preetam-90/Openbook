'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, BookOpen, Sparkles } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { getAllChapters } from '@/lib/get-chapters'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const chapters = getAllChapters()

  const filteredChapters = chapters.filter((chapter) =>
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!mounted) return null

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-white/20 dark:border-slate-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              B
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Bihar History
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-700/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 dark:bg-purple-700/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block mb-6 px-4 py-2 bg-blue-100/50 dark:bg-blue-900/30 rounded-full border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-sm">
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2 justify-center">
                <Sparkles size={16} />
                Discover 500 Years of History
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                The Forgotten Centuries
              </span>
            </h1>

            <p className="text-xl text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Bihar's History from 1500 to 2026: From Mughal Empires to Modern India. An interactive exploration of a land that shaped civilizations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/read/front-matter"
                className="claymorphic group px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <BookOpen size={20} />
                Start Reading
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>

              <a
                href="#table-of-contents"
                className="claymorphic px-8 py-4 rounded-2xl font-semibold text-slate-700 dark:text-slate-200 bg-white/60 dark:bg-slate-800/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <BookOpen size={20} />
                Explore Chapters
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents Section */}
      <section id="table-of-contents" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-slate-900 dark:text-white">
            Table of Contents
          </h2>

          <div className="space-y-3">
            {filteredChapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/read/${chapter.slug}`}
                className="claymorphic-soft group block p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-x-2 hover:bg-white/70 dark:hover:bg-slate-800/70"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      Chapter {chapter.number}: {chapter.title}
                    </h3>
                  </div>
                  <ChevronRight className="text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all group-hover:translate-x-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/20 dark:border-slate-700/20 bg-white/20 dark:bg-slate-900/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center text-slate-700 dark:text-slate-400">
          <p className="mb-2">
            <strong>By Preetam Kumar Singh</strong> | From Banka, Bihar
          </p>
          <p className="text-sm">
            A comprehensive historical study of Bihar from 1500 to 2026
          </p>
        </div>
      </footer>
    </div>
  )
}

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-muted">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif text-foreground">OpenBook</h1>
              <p className="text-xs text-muted-foreground">Bihar History 1500-2026</p>
            </div>
          </motion.div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold font-serif mb-6 text-foreground">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Bihar Through the Ages
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover the rich and complex history of Bihar spanning over 500 years—from medieval kingdoms to modern aspirations. An interactive journey through time.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="clay-card border-primary/20">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search chapters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder-muted-foreground"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        {mounted && (
          <motion.div
            className="max-w-2xl mx-auto mb-12 clay-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ProgressBar progress={progress} bookmarksCount={bookmarks.length} />
          </motion.div>
        )}

        {/* Chapters Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredChapters.length > 0 ? (
              filteredChapters.map((chapter) => (
                <motion.div key={chapter.id} variants={itemVariants}>
                  <Link href={`/chapter/${chapter.id}`}>
                    <div className="group clay-card hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                      {/* Chapter Number Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                          Chapter {chapter.order + 1}
                        </span>
                        {mounted && bookmarks.includes(chapter.id) && (
                          <span className="text-accent text-lg">📌</span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold font-serif text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {chapter.title}
                      </h3>

                      {/* Footer */}
                      <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all mt-auto">
                        <span>Read More</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-24">
                <BookOpen className="w-16 h-16 text-muted mx-auto mb-4 opacity-30" />
                <p className="text-muted-foreground text-lg">No chapters found matching "{searchTerm}"</p>
              </div>
            )}
          </motion.div>
        )}
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 border-t border-muted">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="clay-card text-center">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <p className="text-muted-foreground">Years of History</p>
          </div>
          <div className="clay-card text-center">
            <div className="text-4xl font-bold text-secondary mb-2">{chapters.length}</div>
            <p className="text-muted-foreground">Chapters</p>
          </div>
          <div className="clay-card text-center">
            <div className="text-4xl font-bold text-accent mb-2">∞</div>
            <p className="text-muted-foreground">Knowledge</p>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
