'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Chapter, getAdjacentChapters, chapters } from '@/lib/content';
import { ChevronLeft, ChevronRight, BookOpen, Share2, Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './theme-toggle';

interface ChapterReaderProps {
  chapter: Chapter;
}

export function ChapterReader({ chapter }: ChapterReaderProps) {
  const { previous, next } = getAdjacentChapters(chapter.slug);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentIndex = chapters.findIndex((c) => c.slug === chapter.slug);
  const totalChapters = chapters.length;

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setProgress(Math.min(scrolled, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Reader Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-muted">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="clay-card !p-2">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              OpenBook
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`clay-card !p-3 transition-all ${
                isBookmarked ? 'bg-primary text-primary-foreground' : ''
              }`}
            >
              <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
            <button className="clay-card !p-3 hover:shadow-lg">
              <Share2 className="w-5 h-5" />
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-6">
            <span className="text-sm font-semibold text-primary">{chapter.section}</span>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm">
              <span>Chapter {currentIndex + 1} of {totalChapters}</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            {chapter.title}
          </h1>

          {chapter.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 rounded-3xl overflow-hidden mb-12 clay-card !p-0 border-0"
            >
              <img
                src={chapter.image}
                alt={chapter.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>
          )}
        </motion.div>

        {/* Chapter Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-none mb-16"
        >
          <div className="text-foreground leading-relaxed space-y-6">
            {chapter.content.split('\n\n').map((para, idx) => {
              if (para.startsWith('# ')) {
                return (
                  <h2 key={idx} className="text-4xl font-bold mt-8 mb-4 text-foreground">
                    {para.replace('# ', '')}
                  </h2>
                );
              } else if (para.startsWith('## ')) {
                return (
                  <h3 key={idx} className="text-2xl font-bold mt-6 mb-3 text-foreground">
                    {para.replace('## ', '')}
                  </h3>
                );
              } else if (para.startsWith('- ')) {
                return (
                  <ul key={idx} className="list-disc list-inside mb-4 space-y-2">
                    {para.split('\n').map((item, itemIdx) => (
                      <li key={itemIdx} className="text-base leading-relaxed text-foreground">
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="mb-4 text-base leading-relaxed text-foreground">
                  {para}
                </p>
              );
            })}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 border-t border-muted"
        >
          {previous ? (
            <Link href={`/reader/${previous.slug}`}>
              <motion.div
                whileHover={{ x: -4 }}
                className="clay-card group cursor-pointer h-full flex items-center gap-4"
              >
                <ChevronLeft className="w-6 h-6 text-primary group-hover:text-secondary transition-colors flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Previous Chapter</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {previous.title}
                  </p>
                </div>
              </motion.div>
            </Link>
          ) : (
            <div></div>
          )}

          {next ? (
            <Link href={`/reader/${next.slug}`}>
              <motion.div
                whileHover={{ x: 4 }}
                className="clay-card group cursor-pointer h-full flex items-center justify-end gap-4"
              >
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">Next Chapter</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {next.title}
                  </p>
                </div>
                <ChevronRight className="w-6 h-6 text-primary group-hover:text-secondary transition-colors flex-shrink-0" />
              </motion.div>
            </Link>
          ) : (
            <div></div>
          )}
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link href="/">
            <button className="clay-button bg-muted text-muted-foreground hover:shadow-lg">
              Back to Home
            </button>
          </Link>
        </motion.div>
      </main>

      {/* Reading Progress Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed bottom-8 right-8 clay-card !p-4 hidden lg:block"
      >
        <div className="w-24 h-24 flex flex-col items-center justify-center">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="4"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="4"
                strokeDasharray={226}
                initial={{ strokeDashoffset: 226 }}
                animate={{ strokeDashoffset: 226 - (226 * progress) / 100 }}
                transition={{ duration: 0.3 }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
