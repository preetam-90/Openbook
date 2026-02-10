'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, BookOpen, ArrowLeft, Search as SearchIcon } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

interface SearchResult {
  id: string
  title: string
  order: number
  preview: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!query) return

    const searchChapters = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    searchChapters()
  }, [query])

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-muted">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold font-serif text-foreground">OpenBook</h1>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Search Results */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold font-serif text-foreground mb-4">Search Results</h2>
          <p className="text-lg text-muted-foreground">
            {query && `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          </div>
        ) : results.length > 0 ? (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/chapter/${result.id}`}>
                  <div className="group clay-card hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                        Chapter {result.order + 1}
                      </span>
                      <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-foreground group-hover:text-primary transition-colors mb-2">
                      {result.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{result.preview}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : query ? (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <SearchIcon className="w-16 h-16 text-muted mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground text-lg mb-6">No chapters found matching "{query}"</p>
            <Link href="/" className="clay-button bg-primary text-primary-foreground">
              Back to Home
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <BookOpen className="w-16 h-16 text-muted mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground text-lg">Enter a search query to begin</p>
          </motion.div>
        )}
      </section>
    </main>
  )
}
