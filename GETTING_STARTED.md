# Getting Started Guide - Bihar History Book Website

Welcome! This guide will help you get the interactive Bihar history book website up and running quickly.

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies
```bash
pnpm install
```

### Step 2: Start Development Server
```bash
pnpm dev
```

### Step 3: Open in Browser
Navigate to `http://localhost:3000` and you'll see the beautiful homepage with all chapters listed.

## 📺 What You'll See

### Homepage
- **Hero Section**: Eye-catching gradient text with "The Forgotten Centuries" title
- **Features**: 6 feature cards showcasing the book's capabilities
- **Table of Contents**: All chapters with clickable links to read them
- **Footer**: Author information and publication details

### Chapter Pages
- **Header**: Navigation back to home with theme toggle
- **Sidebar**: List of all chapters (collapsible on mobile)
- **Content**: Full markdown content with proper formatting
- **Navigation**: Previous/Next chapter buttons at the bottom

## 🎨 Features to Explore

### Design Elements
- ✨ **Claymorphism**: Soft shadows, rounded corners, backdrop blur
- 🌙 **Dark Mode**: Click the moon/sun icon in the header to toggle
- 📱 **Responsive**: Works perfectly on phone, tablet, and desktop
- ⚡ **Animations**: Smooth hover effects and transitions throughout

### Interactive Components
1. **Theme Toggle** (Top Right): Switch between light and dark modes
2. **Chapter Links**: Click any chapter to read it
3. **Navigation Buttons**: Use Previous/Next to navigate between chapters
4. **Mobile Menu**: Click the menu icon on mobile to see chapters

## 📖 Understanding the Content

The book contains chapters about Bihar's history from 1500-2026:

- **Chapters 1-2**: Medieval and Afghan period
- **Chapters 3-5**: Mughal and British colonial era
- **Chapters 6-7**: 1857 Revolt and nationalist movement
- **Chapters 8-10**: Champaran Satyagraha and independence
- **Chapters 11-12**: Modern Bihar (1947-2026)

All content is loaded from markdown (.md) files and rendered beautifully in the browser.

## 🛠 Development Features

### File Structure
```
app/
├── page.tsx          ← Homepage
├── layout.tsx        ← Root layout
├── globals.css       ← Global styles
└── read/
    ├── layout.tsx    ← Chapter reader layout
    └── [slug]/
        └── page.tsx  ← Dynamic chapter page

components/
├── theme-provider.tsx  ← Dark mode provider
└── theme-toggle.tsx    ← Theme switcher

lib/
├── get-chapters.ts     ← Chapter metadata
└── cn.ts               ← CSS utility
```

### Key Technologies
- **Framework**: Next.js 16 (Server Components + Client Components)
- **Styling**: Tailwind CSS with custom claymorphism classes
- **Content**: React Markdown for rendering .md files
- **Theme**: next-themes for dark mode
- **Icons**: lucide-react

## 🔧 Customization Guide

### Changing Colors
Edit `app/globals.css` to modify the color palette:
```css
/* Change gradient colors in .claymorphic class */
@apply backdrop-blur-md bg-white/70 dark:bg-slate-900/70 
```

### Adding New Chapters
1. Add markdown file to project root
2. Update `lib/get-chapters.ts` with new chapter metadata
3. Access via `/read/your-chapter-slug`

### Modifying Typography
Find text sizes in `app/page.tsx` and `app/read/[slug]/page.tsx`:
```tsx
<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
```

## ✨ Visual Tour

### Homepage Features
1. **Navigation Header**: Sticky header with logo and theme toggle
2. **Hero Section**: Animated gradient background with call-to-action buttons
3. **Features Section**: 6 cards showcasing key features
4. **Chapters List**: Complete table of contents with hover effects
5. **Footer**: Author and publication information

### Reader Page Features
1. **Sidebar Navigation**: Chapter list with current chapter highlighted
2. **Main Content**: Markdown rendered with proper formatting
3. **Navigation Controls**: Previous/Next buttons
4. **Mobile Responsive**: Hamburger menu on small screens
5. **Dark Mode Support**: Readable in any lighting condition

## 🎯 Best Practices

### For Reading
- Use dark mode for comfortable reading in dim lighting
- Click chapters to jump to them, or use Previous/Next to read sequentially
- The content is fully responsive - resize your browser to test mobile view

### For Development
- All components are in `components/` directory
- Pages are in `app/` directory following Next.js conventions
- Styles are primarily Tailwind classes - check `app/globals.css` for custom styles
- The `lib/get-chapters.ts` file is the source of truth for chapter data

## 🐛 Troubleshooting

### Nothing showing up?
```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
pnpm dev
```

### Markdown not rendering?
- Ensure markdown file names match exactly in `lib/get-chapters.ts`
- Files should be in the project root directory

### Styles look weird?
- Clear browser cache (Ctrl+Shift+Del or Cmd+Shift+Del)
- Restart dev server: press `Ctrl+C` then `pnpm dev`

## 📚 Learning Resources

- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Markdown**: https://github.com/remarkjs/react-markdown
- **Claymorphism**: Modern design trend with soft, organic UI

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
pnpm build
vercel deploy
```

### Deploy to Other Platforms
```bash
pnpm build  # Creates .next folder
pnpm start  # Starts production server
```

## 📞 Need Help?

- Check the main `README.md` for detailed documentation
- Review the code comments in the component files
- Check `CHANGELOG.md` for recent updates

---

**Enjoy exploring Bihar's fascinating history through this modern, beautifully designed digital book!** 🎉
