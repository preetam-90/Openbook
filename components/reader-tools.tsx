'use client';

import Link from 'next/link';
import { Bookmark, BookmarkCheck, Printer } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export function ReaderTools({
  slug,
  prev,
  next
}: {
  slug: string;
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}) {
  const [progress, setProgress] = useState(0);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('openbook:bookmarks');
    if (stored) {
      setBookmarks(JSON.parse(stored) as string[]);
    }

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
      setProgress(value);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const bookmarked = useMemo(() => bookmarks.includes(slug), [bookmarks, slug]);

  const toggleBookmark = () => {
    const updated = bookmarked ? bookmarks.filter((item) => item !== slug) : [...bookmarks, slug];
    setBookmarks(updated);
    localStorage.setItem('openbook:bookmarks', JSON.stringify(updated));
  };

  return (
    <>
      <div className="read-progress" aria-hidden>
        <span style={{ width: `${progress}%` }} />
      </div>
      <nav className="reader-tools clay-panel" aria-label="Chapter controls">
        <div className="reader-actions">
          <button type="button" onClick={toggleBookmark}>
            {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
          <button type="button" onClick={() => window.print()}>
            <Printer size={16} /> Print
          </button>
        </div>
        <div className="reader-links">
          {prev ? <Link href={`/chapter/${prev.slug}`}>← {prev.title}</Link> : <span />}
          <Link href="/">Back to TOC</Link>
          {next ? <Link href={`/chapter/${next.slug}`}>{next.title} →</Link> : <span />}
        </div>
      </nav>
    </>
  );
}
