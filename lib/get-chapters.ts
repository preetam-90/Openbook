import fs from 'fs';
import path from 'path';

interface Chapter {
  id: string;
  title: string;
  number: number;
  slug: string;
  file: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: '0',
    title: 'Front Matter',
    number: 0,
    slug: 'front-matter',
    file: 'bihar_history_book_FRONT_MATTER.md',
  },
  {
    id: '1',
    title: 'Medieval Bihar\'s Decline (1500-1526)',
    number: 1,
    slug: 'medieval-bihar-decline',
    file: 'bihar_history_book_CHAPTER_01.md',
  },
  {
    id: '2',
    title: 'Sher Shah Suri & Afghan Interval (1540-1555)',
    number: 2,
    slug: 'sher-shah-suri',
    file: 'bihar_history_book_CHAPTER_02.md',
  },
  {
    id: '3',
    title: 'Mughal Era Bihar (1556-1757)',
    number: 3,
    slug: 'mughal-era',
    file: 'bihar_history_book_CHAPTER_03_HINDI.md',
  },
  {
    id: '4',
    title: 'Battle of Buxar & British Empire (1764)',
    number: 4,
    slug: 'battle-of-buxar',
    file: 'bihar_history_book_CHAPTER_04_HINDI.md',
  },
  {
    id: '5',
    title: 'Permanent Settlement & Zamindari System',
    number: 5,
    slug: 'permanent-settlement',
    file: 'bihar_history_book_CHAPTER_05_HINDI.md',
  },
  {
    id: '6-7',
    title: 'Revolt of 1857 & Nationalist Movement',
    number: 6,
    slug: 'revolt-1857',
    file: 'bihar_history_book_CHAPTER_06_07_HINDI.md',
  },
  {
    id: '8-10',
    title: 'Champaran Satyagraha & Post-Independence',
    number: 8,
    slug: 'champaran-satyagraha',
    file: 'bihar_history_book_CHAPTER_08_09_10_HINDI.md',
  },
  {
    id: '11-12',
    title: 'Modern Bihar (1947-2026)',
    number: 11,
    slug: 'modern-bihar',
    file: 'bihar_history_book_CHAPTER_11_12_HINDI.md',
  },
  {
    id: 'conclusion',
    title: 'Conclusion & Bibliography',
    number: 13,
    slug: 'conclusion',
    file: 'bihar_history_book_CONCLUSION_BIBLIOGRAPHY_INDEX_HINDI.md',
  },
];

export function getAllChapters(): Chapter[] {
  return CHAPTERS;
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  return CHAPTERS.find((ch) => ch.slug === slug);
}

export function getChapterContent(filename: string): string {
  try {
    const filePath = path.join(process.cwd(), filename);
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    return '';
  }
}

export function getTableOfContents() {
  return CHAPTERS.map((chapter) => ({
    ...chapter,
    href: `/read/${chapter.slug}`,
  }));
}
