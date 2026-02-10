'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Chapter } from '@/lib/book';

export function ChapterCatalog({ chapters }: { chapters: Chapter[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return chapters;
    }
    const q = query.toLowerCase();
    return chapters.filter(
      (chapter) =>
        chapter.title.toLowerCase().includes(q) ||
        chapter.excerpt.toLowerCase().includes(q) ||
        chapter.headings.some((heading) => heading.text.toLowerCase().includes(q))
    );
  }, [chapters, query]);

  return (
    <div>
      <label className="search-box clay-panel">
        <Search size={16} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search chapters, events, or topics"
        />
      </label>

      <div className="chapter-grid">
        {filtered.map((chapter, index) => (
          <article key={chapter.slug} className="chapter-card clay-panel">
            <p className="chapter-index">Chapter {index + 1}</p>
            <h3>{chapter.title}</h3>
            <p>{chapter.excerpt}</p>
            <Link href={`/chapter/${chapter.slug}`}>Read chapter</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
