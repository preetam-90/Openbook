import { ChapterCatalog } from '@/components/chapter-catalog';
import { HomeProgress } from '@/components/home-progress';
import { TocSidebar } from '@/components/toc-sidebar';
import { getAllChapters } from '@/lib/book';

export default function HomePage() {
  const chapters = getAllChapters();

  return (
    <main className="layout-grid">
      <TocSidebar chapters={chapters} />
      <section className="content-panel clay-panel">
        <h2>Welcome to your interactive history book</h2>
        <p>
          Explore Bihar&apos;s historical journey through a modern, readable web-book experience with chapter navigation,
          contextual visuals, bookmarks, progress tracking, and print support.
        </p>
        <HomeProgress total={chapters.length} />
        <ChapterCatalog chapters={chapters} />
      </section>
    </main>
  );
}
