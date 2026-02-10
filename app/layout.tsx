import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: 'Bihar History Interactive Book',
  description: 'An interactive claymorphism web book for Bihar history (1500-2026).'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="book-shell">
            <header className="top-nav clay-panel">
              <div>
                <p className="eyebrow">Interactive Digital Archive</p>
                <h1>Bihar History: 1500–2026</h1>
              </div>
              <ThemeToggle />
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
