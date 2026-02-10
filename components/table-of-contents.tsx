import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const chapters = [
  {
    id: 'chapter-1',
    title: 'Introduction to Bihar',
    description: 'Discover the geographical and cultural foundations of Bihar',
    pages: '1-15'
  },
  {
    id: 'chapter-2',
    title: 'Medieval Period (1500-1700)',
    description: 'The Mughal era and its influence on Bihar',
    pages: '16-45'
  },
  {
    id: 'chapter-3',
    title: 'Colonial Era (1750-1850)',
    description: 'British rule and its impact on Bihar',
    pages: '46-75'
  },
  {
    id: 'chapter-4',
    title: 'Independence Movement',
    description: 'Revolutionaries and freedom fighters of Bihar',
    pages: '76-105'
  },
  {
    id: 'chapter-5',
    title: 'Post-Independence Era',
    description: 'Nation building and development',
    pages: '106-135'
  },
  {
    id: 'chapter-6',
    title: 'Modern Bihar',
    description: 'Contemporary developments and progress',
    pages: '136-165'
  },
  {
    id: 'chapter-7',
    title: 'Culture & Arts',
    description: 'Traditions, festivals, and artistic heritage',
    pages: '166-190'
  },
  {
    id: 'chapter-8',
    title: 'Economy & Development',
    description: 'Trade, agriculture, and industrial growth',
    pages: '191-220'
  },
  {
    id: 'chapter-9',
    title: 'Education & Society',
    description: 'Educational institutions and social progress',
    pages: '221-245'
  },
  {
    id: 'chapter-10',
    title: 'Future Vision',
    description: 'Bihar in the 21st century and beyond',
    pages: '246-265'
  },
  {
    id: 'chapter-11',
    title: 'Conclusion & Index',
    description: 'Summary and comprehensive index',
    pages: '266-280'
  }
]

export function TableOfContents() {
  return (
    <div id="table-of-contents" className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {chapters.map((chapter) => (
        <Link
          key={chapter.id}
          href={`/read/${chapter.id}`}
          className="group claymorphic p-6 hover:shadow-2xl transition-smooth hover:-translate-y-1 cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-smooth">
              {chapter.title}
            </h3>
            <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-smooth" />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {chapter.description}
          </p>
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            Pages {chapter.pages}
          </span>
        </Link>
      ))}
    </div>
  )
}
