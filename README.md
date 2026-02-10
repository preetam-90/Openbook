# The Forgotten Centuries: Bihar's History (1500-2026)

An interactive digital book showcasing 500 years of Bihar's rich history with a modern, claymorphism-based UI and smooth animations.

## 📚 Project Overview

This is a comprehensive historical work by Preetam Kumar Singh exploring Bihar's transformation from 1500 to the present day, presented as an interactive web application with:

- **Beautiful Claymorphism Design**: Modern UI with glass morphism effects and smooth animations
- **Dark Mode Support**: Automatic theme detection with manual toggle
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Navigation**: Intuitive chapter navigation with smooth page transitions
- **Markdown Content**: All chapters rendered from markdown files with proper formatting

## 🚀 Quick Start

### Installation

1. Clone the repository:
```bash
git clone https://github.com/preetam-90/Openbook.git
cd Openbook
```

2. Install dependencies using pnpm:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
/vercel/share/v0-project
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Homepage with hero section and TOC
│   ├── globals.css         # Global styles with claymorphism effects
│   └── read/
│       ├── layout.tsx      # Chapter reader layout
│       └── [slug]/
│           └── page.tsx    # Dynamic chapter page component
├── components/
│   ├── theme-provider.tsx  # Next-themes provider
│   └── theme-toggle.tsx    # Theme switcher button
├── lib/
│   ├── get-chapters.ts     # Chapter metadata and loader
│   └── cn.ts               # Utility for conditional classnames
├── tailwind.config.ts      # Tailwind CSS configuration
├── package.json            # Dependencies and scripts
└── *.md                    # Markdown chapter files

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
