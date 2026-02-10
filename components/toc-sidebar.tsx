import Link from 'next/link';
import type { Chapter } from '@/lib/book';

export function TocSidebar({ chapters, activeSlug }: { chapters: Chapter[]; activeSlug?: string }) {
  return (
    <aside className="toc-sidebar clay-panel">
      <h2>Table of Contents</h2>
      <ol>
        {chapters.map((chapter, index) => (
          <li key={chapter.slug} className={chapter.slug === activeSlug ? 'active' : ''}>
            <Link href={`/chapter/${chapter.slug}`}>
              <span className="toc-order">{String(index + 1).padStart(2, '0')}</span>
              <span>{chapter.title}</span>
            </Link>
            {chapter.headings.length > 1 ? (
              <ul>
                {chapter.headings.slice(1, 5).map((heading) => (
                  <li key={heading.id}>{heading.text}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </aside>
  );
}
