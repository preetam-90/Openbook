import matter from 'gray-matter';

export interface Chapter {
  id: string;
  title: string;
  slug: string;
  content: string;
  section: string;
  order: number;
  image?: string;
}

export interface TableOfContents {
  [section: string]: Chapter[];
}

// Sample chapters data - In production, this would read from actual markdown files
export const chapters: Chapter[] = [
  {
    id: '1',
    title: 'The Medieval Kingdom',
    slug: 'medieval-kingdom',
    section: 'Ancient & Medieval Era',
    order: 1,
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop',
    content: `# The Medieval Kingdom of Bihar

## Overview
Bihar, in ancient times known as Magadha, was one of the most powerful kingdoms in ancient India. The region was home to the Mauryan Empire under Ashoka the Great.

## Key Historical Events
- **322-185 BCE**: Mauryan Empire ruled by the Nanda and Mauryan dynasties
- **261 BCE**: Ashoka's conquest of Kalinga, leading to his conversion to Buddhism
- **Spread of Buddhism**: Bihar became the center of Buddhist learning and philosophy

## Important Figures
Ashoka the Great was one of the greatest emperors of India. He ruled the vast Mauryan Empire from 268 to 232 BCE and was a staunch promoter of Buddhism.

## Cultural Significance
This period marked the golden age of Bihar, with the establishment of great universities like Nalanda. The region became a beacon of learning and spirituality.`,
  },
  {
    id: '2',
    title: 'The Golden Age of Learning',
    slug: 'golden-age',
    section: 'Ancient & Medieval Era',
    order: 2,
    image: 'https://images.unsplash.com/photo-1507842217343-583f7270b69f?w=800&h=600&fit=crop',
    content: `# The Golden Age of Learning

## Nalanda University
Nalanda University was one of the oldest universities in the world, established in the 5th century CE. It became the most prestigious center of learning in the ancient world.

### Academic Excellence
- Over 10,000 students from different countries
- 2,000 faculty members
- Extensive libraries with thousands of manuscripts
- Curriculum covering philosophy, logic, epistemology, and metaphysics

### Notable Scholars
- Aryadeva - Buddhist philosopher
- Vasubandhu - Logician and scholar
- Dignaga - Father of Indian logic

## Legacy
The university was destroyed in the 12th century but its influence on education and philosophy continues to this day.`,
  },
  {
    id: '3',
    title: 'Medieval Sultanates',
    slug: 'medieval-sultanates',
    section: 'Medieval Period',
    order: 3,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    content: `# Medieval Sultanates of Bihar

## The Delhi Sultanate Era
After the decline of the Mauryan and Gupta empires, Bihar fell under various sultanates.

### Important Sultanates
- **Bengal Sultanate** (1352-1487)
- **Bahmani Sultanate** influence
- **Mughal Empire** integration

## Architecture & Culture
Medieval Bihar witnessed the construction of numerous mosques and forts. The architectural style blended Hindu and Islamic influences.

## Economic Development
- Trade routes flourished through the Silk Road
- Agriculture became more sophisticated
- Cities like Patna emerged as important trade centers`,
  },
];

// Generate Table of Contents
export function getTableOfContents(): TableOfContents {
  const toc: TableOfContents = {};

  chapters.forEach((chapter) => {
    if (!toc[chapter.section]) {
      toc[chapter.section] = [];
    }
    toc[chapter.section].push(chapter);
  });

  // Sort chapters within each section by order
  Object.keys(toc).forEach((section) => {
    toc[section].sort((a, b) => a.order - b.order);
  });

  return toc;
}

// Get chapter by slug
export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.slug === slug);
}

// Get chapter by id
export function getChapterById(id: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id);
}

// Get adjacent chapters for navigation
export function getAdjacentChapters(slug: string) {
  const currentIndex = chapters.findIndex((c) => c.slug === slug);
  return {
    previous: currentIndex > 0 ? chapters[currentIndex - 1] : null,
    next: currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null,
  };
}

// Search chapters
export function searchChapters(query: string): Chapter[] {
  const lowerQuery = query.toLowerCase();
  return chapters.filter(
    (chapter) =>
      chapter.title.toLowerCase().includes(lowerQuery) ||
      chapter.content.toLowerCase().includes(lowerQuery)
  );
}
