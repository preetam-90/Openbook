import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type Heading = {
  depth: number;
  text: string;
  id: string;
};

export type Chapter = {
  slug: string;
  title: string;
  fileName: string;
  content: string;
  excerpt: string;
  headings: Heading[];
};

const rootDir = process.cwd();

const ignoredFiles = new Set(['README.md']);

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function fileNameToTitle(fileName: string): string {
  return fileName
    .replace(/\.md$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function extractHeadings(markdown: string): Heading[] {
  const headings = markdown
    .split('\n')
    .filter((line) => line.startsWith('#'))
    .map((line) => {
      const match = /^(#{1,6})\s+(.+)$/.exec(line.trim());
      if (!match) {
        return null;
      }
      const [, hashes, text] = match;
      return {
        depth: hashes.length,
        text,
        id: slugify(text)
      };
    })
    .filter((item): item is Heading => item !== null);

  return headings;
}

function getExcerpt(markdown: string): string {
  const cleaned = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#>*_`-]/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned.slice(0, 180) + (cleaned.length > 180 ? '…' : '');
}

export function getAllChapterFiles(): string[] {
  const files = fs
    .readdirSync(rootDir)
    .filter((file) => file.endsWith('.md') && !ignoredFiles.has(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  return files;
}

export function getAllChapters(): Chapter[] {
  return getAllChapterFiles().map((fileName) => {
    const fullPath = path.join(rootDir, fileName);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { content, data } = matter(raw);
    const title = (data.title as string | undefined) || extractHeadings(content)[0]?.text || fileNameToTitle(fileName);

    return {
      slug: slugify(fileName.replace(/\.md$/, '')),
      title,
      fileName,
      content,
      excerpt: getExcerpt(content),
      headings: extractHeadings(content)
    };
  });
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  return getAllChapters().find((chapter) => chapter.slug === slug);
}

export function getChapterNeighbors(slug: string): { prev?: Chapter; next?: Chapter } {
  const chapters = getAllChapters();
  const index = chapters.findIndex((chapter) => chapter.slug === slug);

  if (index < 0) {
    return {};
  }

  return {
    prev: chapters[index - 1],
    next: chapters[index + 1]
  };
}

export function getRelatedImages(chapter: Chapter): Array<{ src: string; alt: string; caption: string }> {
  const text = `${chapter.title} ${chapter.content}`.toLowerCase();
  const images: Array<{ src: string; alt: string; caption: string }> = [];

  if (/maurya|ashoka|nalanda|buddh/i.test(text)) {
    images.push({
      src: '/images/nalanda.svg',
      alt: 'Nalanda ruins illustration',
      caption: 'Nalanda Mahavihara legacy in Bihar.'
    });
  }

  if (/mughal|sher shah|delhi|sultan/i.test(text)) {
    images.push({
      src: '/images/rohtas.svg',
      alt: 'Rohtas Fort illustration',
      caption: 'Rohtas region and medieval military architecture.'
    });
  }

  if (/independence|gandhi|champaran|freedom|british/i.test(text)) {
    images.push({
      src: '/images/champaran.svg',
      alt: 'Champaran movement illustration',
      caption: 'Champaran Satyagraha and freedom movement in Bihar.'
    });
  }

  if (/ganga|river|agriculture|bihar/i.test(text) && images.length < 3) {
    images.push({
      src: '/images/ganga.svg',
      alt: 'Ganga river map style illustration',
      caption: 'The Ganga basin shaping Bihar’s social and economic history.'
    });
  }

  return images.slice(0, 3);
}
