'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Sparkles, Search } from 'lucide-react';
import { getTableOfContents } from '@/lib/content';
import { TableOfContents } from './table-of-contents';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export function Homepage() {
  const toc = getTableOfContents();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-muted">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="clay-card !p-3 !shadow-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground font-serif">OpenBook</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center gap-6"
          >
            <a href="#toc" className="text-foreground hover:text-primary transition-colors">
              Contents
            </a>
            <button className="clay-button bg-primary text-primary-foreground">
              Start Reading
            </button>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-semibold">
                  Discover History
                </span>
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Bihar Through the <span className="text-primary">Ages</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Immerse yourself in the rich and vibrant history of Bihar from 1500 to 2026. 
                Explore ancient kingdoms, cultural renaissance, and the modern era through an 
                interactive digital experience.
              </p>

              <div className="flex gap-4 pt-6">
                <Link href="/reader/medieval-kingdom">
                  <button className="clay-button bg-primary text-primary-foreground hover:shadow-xl">
                    Begin Journey
                  </button>
                </Link>
                <button className="clay-button bg-muted text-muted-foreground hover:shadow-xl">
                  Learn More
                </button>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              variants={itemVariants}
              className="relative h-96 md:h-96"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0"
              >
                <div className="clay-card relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20"></div>
                  <div className="absolute top-10 left-10 w-32 h-32 rounded-3xl bg-primary/30 blur-2xl"></div>
                  <div className="absolute bottom-10 right-10 w-40 h-40 rounded-3xl bg-secondary/30 blur-2xl"></div>
                  <div className="relative h-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="text-6xl"
                    >
                      📚
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 border-t border-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="clay-card !p-2 flex items-center gap-3 bg-primary/5 border-primary/20">
              <Search className="w-5 h-5 text-muted-foreground ml-3" />
              <input
                type="text"
                placeholder="Search chapters, topics, or historical events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground py-3"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <TableOfContents toc={toc} />

      {/* Features Section */}
      <section className="py-20 border-t border-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-foreground mb-4">
              Features
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience reading like never before with our modern interactive features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎨',
                title: 'Stunning Design',
                description: 'Beautiful claymorphism UI with smooth animations',
              },
              {
                icon: '📖',
                title: 'Page Navigation',
                description: 'Smooth page-flip effects and chapter navigation',
              },
              {
                icon: '🌙',
                title: 'Dark Mode',
                description: 'Eye-friendly dark theme for comfortable reading',
              },
              {
                icon: '🔍',
                title: 'Full Search',
                description: 'Find any topic or event across all chapters',
              },
              {
                icon: '📊',
                title: 'Progress Tracking',
                description: 'Keep track of your reading journey',
              },
              {
                icon: '⭐',
                title: 'Bookmarks',
                description: 'Save your favorite passages and chapters',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="clay-card group hover:shadow-lg hover:border-primary/50"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 className="font-bold text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-muted py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-foreground mb-4">OpenBook</h4>
              <p className="text-muted-foreground text-sm">
                Exploring the history of Bihar through interactive digital storytelling.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-3">Contents</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Chapters</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Timeline</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Topics</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-3">Resources</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Bibliography</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">References</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-3">Legal</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-muted pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 OpenBook. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm mt-4 md:mt-0">
              Crafted with <span className="text-accent">❤</span> for history enthusiasts
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
