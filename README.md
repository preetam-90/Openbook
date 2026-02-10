# OpenBook: Bihar History 1500-2026

An interactive digital book platform showcasing the complete history of Bihar from 1500 to 2026. Built with modern web technologies and designed with claymorphism aesthetic for an engaging reading experience.

## 📚 Project Overview

This is a comprehensive historical work by Preetam Kumar Singh exploring Bihar's transformation from 1500 to the present day, presented as an interactive web application with:

- **Beautiful Claymorphism Design**: Soft shadows, rounded corners, and warm color palette
- **Interactive Chapter Reader**: Flipbook animations with smooth page transitions
- **Dark/Light Mode**: Automatic theme detection with manual toggle
- **Search Functionality**: Full-text search across all chapters
- **Bookmarking System**: Save favorite chapters for quick access
- **Progress Tracking**: Visual progress indicator for reading completion
- **Responsive Design**: Mobile-first design optimized for all devices
- **Historical Images**: Embedded illustrations throughout chapters

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (tested with 20+)
- pnpm (recommended) or npm

### Installation

1. **Navigate to project directory**:
```bash
cd /vercel/share/v0-project
```

2. **Install dependencies**:
```bash
pnpm install
# or
npm install
```

3. **Run the development server**:
```bash
pnpm dev
# or
npm run dev
```

4. **Open in browser**:
Navigate to `http://localhost:3000`

### Build for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                 # Homepage with chapter grid
│   ├── chapter/
│   │   └── [id]/page.tsx       # Chapter reader page
│   ├── search/
│   │   └── page.tsx            # Search results page
│   ├── api/
│   │   ├── chapters/route.ts   # Get all chapters
│   │   ├── chapter/[id]/route.ts # Get single chapter
│   │   └── search/route.ts     # Search chapters
│   ├── globals.css             # Global styles and clay classes
│   ├── prose.css               # Markdown content styles
│   └── layout.tsx              # Root layout with theme provider
├── components/
│   ├── theme-toggle.tsx        # Dark/light mode switcher
│   ├── theme-provider.tsx      # Next-themes provider
│   └── progress-bar.tsx        # Reading progress indicator
├── hooks/
│   ├── use-book.ts            # Book data fetching hook
│   └── use-progress.ts        # Progress and bookmarks hook
├── lib/
│   ├── markdown.ts            # Markdown parsing utilities
│   └── image-mapper.ts        # Chapter-to-image mapping
├── public/
│   ├── bihar-history-01.jpg
│   ├── sher-shah.jpg
│   ├── kunwar-singh.jpg
│   └── champaran.jpg
├── tailwind.config.ts         # Tailwind CSS configuration
├── package.json               # Dependencies and scripts
└── *.md                       # Markdown chapter files
```

## 📖 Chapters

The book includes the following chapters:

1. **Front Matter** - Title page, dedication, and preface
2. **Medieval Bihar's Decline (1500-1526)** - Early modern period
3. **Sher Shah Suri & Afghan Interval (1540-1555)** - Afghan rule era
4. **Mughal Era Bihar (1556-1757)** - Mughal administration
5. **Battle of Buxar & British Empire (1764)** - Colonial conquest
6. **Permanent Settlement & Zamindari System** - British land reforms
7. **Revolt of 1857 & Nationalist Movement** - Independence struggle
8. **Champaran Satyagraha & Post-Independence** - Gandhi era
9. **Modern Bihar (1947-2026)** - Contemporary history
10. **Conclusion & Bibliography** - Scholarly references

## 🎨 Design Features

### Claymorphism Style
- Soft shadows and rounded corners
- Backdrop blur effects for depth
- Gradient text for headings
- Smooth hover animations
- Color palette: Blue, Purple, Pink, and Slate neutrals

### Interactive Elements
- Hover animations on chapters and buttons
- Smooth page transitions
- Animated blob backgrounds on hero
- Gradient accents throughout
- Responsive sidebar for chapter navigation

### Typography
- **Font**: Poppins (modern, clean sans-serif)
- **Heading Sizes**: 7xl for main title, 4xl for chapter titles, 3xl for sections
- **Line Height**: 1.6 for optimal readability
- **Dark Mode**: Full support with proper contrast

## 🔄 How It Works

### Content Loading
1. Chapter metadata is defined in `/lib/get-chapters.ts`
2. Markdown files are loaded dynamically when chapter pages are visited
3. React Markdown renders the content with custom component styling
4. All styling is handled through Tailwind CSS classes

### Navigation
- **Homepage**: Lists all chapters with beautiful cards
- **Chapter Pages**: Display full markdown content with sidebar navigation
- **Previous/Next**: Easy navigation between sequential chapters
- **Mobile**: Hamburger menu on small screens for sidebar access

### Theme System
- Uses `next-themes` for automatic theme detection
- Toggle button in header switches between light and dark modes
- All colors automatically adjust via CSS dark mode utilities

## 🛠 Technologies Used

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS with custom claymorphism components
- **Markdown**: react-markdown for dynamic content rendering
- **Theme**: next-themes for dark mode support
- **Icons**: lucide-react for consistent iconography
- **Font**: Google Fonts (Poppins)

## 📦 Dependencies

Key packages:
- `next` - React framework
- `react-markdown` - Markdown rendering
- `next-themes` - Theme management
- `tailwindcss` - Utility CSS framework
- `lucide-react` - Icon library
- `tailwind-merge` & `clsx` - CSS utility helpers

## 🎯 Key Features

✅ **Complete Chapter System** - All 10+ chapters with proper navigation
✅ **Responsive Design** - Mobile, tablet, and desktop optimized
✅ **Dark Mode** - Full dark mode support with automatic detection
✅ **Modern UI** - Claymorphism design with smooth animations
✅ **Fast Performance** - Static generation and optimized images
✅ **Accessibility** - Semantic HTML and ARIA attributes
✅ **Search-Friendly** - Proper metadata and structured content

## 📝 Adding New Chapters

To add a new chapter:

1. Create a new markdown file in the root directory
2. Add chapter metadata to `lib/get-chapters.ts`:
```typescript
{
  id: '11',
  title: 'Your Chapter Title',
  number: 11,
  slug: 'your-chapter-slug',
  file: 'your_file_name.md',
}
```
3. Navigate to `/read/your-chapter-slug` to view it

## 🌐 Deployment

Deploy to Vercel (recommended):

```bash
pnpm build
vercel deploy
```

Or build and run locally:
```bash
pnpm build
pnpm start
```

## 📄 License

This project contains original historical research by Preetam Kumar Singh.

## 👤 Author

**Preetam Kumar Singh**  
From Banka, Bihar  
2026

A comprehensive historical study of Bihar from 1500 to 2026, exploring the region's transformation through empires, colonialism, and independence to modern times.

---

Built with Next.js, React, and Tailwind CSS. Designed with modern UI/UX principles and claymorphism aesthetics.
