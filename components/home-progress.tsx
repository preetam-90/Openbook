'use client';

import { useEffect, useMemo, useState } from 'react';

export function HomeProgress({ total }: { total: number }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('openbook:bookmarks');
    if (stored) {
      setBookmarks(JSON.parse(stored) as string[]);
    }
  }, []);

  const pct = useMemo(() => {
    if (total === 0) {
      return 0;
    }
    return Math.round((bookmarks.length / total) * 100);
  }, [bookmarks.length, total]);

  return (
    <div className="clay-panel progress-panel">
      <p>
        Reading Progress: <strong>{pct}%</strong>
      </p>
      <div className="progress-track" aria-hidden>
        <span style={{ width: `${pct}%` }} />
      </div>
      <small>{bookmarks.length} bookmarked chapters</small>
    </div>
  );
}
