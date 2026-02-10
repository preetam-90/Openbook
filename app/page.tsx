'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, BookOpen, Search } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { ProgressBar } from '@/components/progress-bar'
import { useProgress } from '@/hooks/use-progress'

interface Chapter {
  id: string
  title: string
  order: number
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { progress, bookmarks, mounted } = useProgress()

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch('/api/chapters')
        const data = await response.json()
        setChapters(data)
      } catch (error) {
        console.error('Failed to fetch chapters:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChapters()
  }, [])

  const filteredChapters = chapters.filter((chapter) =>
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
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
