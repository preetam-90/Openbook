import { BookOpen, BookMarked, Zap } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { TableOfContents } from '@/components/table-of-contents'
import { WelcomeHero } from '@/components/welcome-hero'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <WelcomeHero />
      
      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Explore Bihar's Rich Heritage
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Dive into centuries of history, culture, and transformation through interactive chapters and immersive design.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: BookOpen,
              title: 'Interactive Chapters',
              description: 'Seamlessly navigate through carefully crafted chapters with smooth page transitions.'
            },
            {
              icon: BookMarked,
              title: 'Rich Content',
              description: 'Explore historical facts, images, timelines, and detailed narratives about Bihar.'
            },
            {
              icon: Zap,
              title: 'Modern Interface',
              description: 'Experience a beautiful claymorphism design with dark mode support and responsive layout.'
            }
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <div key={i} className="claymorphic p-8 hover:shadow-2xl transition-smooth">
                <Icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Table of Contents Preview */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Table of Contents
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Select a chapter to begin your journey through Bihar's history
          </p>
        </div>
        <TableOfContents />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto text-center mb-12">
        <div className="glass-effect p-12 rounded-3xl">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Explore?
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Start with the first chapter or jump to any section that interests you. The book adapts to your reading preference.
          </p>
          <Link
            href="/read/chapter-1"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl transition-smooth hover:scale-105"
          >
            Start Reading
          </Link>
        </div>
      </section>
    </main>
  )
}
