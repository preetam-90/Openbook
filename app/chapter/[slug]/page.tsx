import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { ReaderTools } from '@/components/reader-tools';
import { TocSidebar } from '@/components/toc-sidebar';
import { getAllChapters, getChapterBySlug, getChapterNeighbors, getRelatedImages } from '@/lib/book';

export function generateStaticParams() {
  return getAllChapters().map((chapter) => ({ slug: chapter.slug }));
}

export default function ChapterPage({ params }: { params: { slug: string } }) {
  const chapter = getChapterBySlug(params.slug);

  if (!chapter) {
    notFound();
  }

  const chapters = getAllChapters();
  const { prev, next } = getChapterNeighbors(chapter.slug);
  const relatedImages = getRelatedImages(chapter);

  return (
    <main className="layout-grid">
      <TocSidebar chapters={chapters} activeSlug={chapter.slug} />
      <article className="content-panel clay-panel">
        <ReaderTools slug={chapter.slug} prev={prev} next={next} />
        <header>
          <p className="eyebrow">{chapter.fileName}</p>
          <h2>{chapter.title}</h2>
        </header>

        {relatedImages.length ? (
          <section className="image-strip" aria-label="Historical illustrations">
            {relatedImages.map((image) => (
              <figure key={image.src} className="clay-panel">
                <Image src={image.src} alt={image.alt} width={480} height={280} />
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </section>
        ) : null}

        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}>
            {chapter.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
