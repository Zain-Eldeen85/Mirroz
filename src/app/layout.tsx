
'use client'
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n';
import type { Locale } from '@/i18n';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const locale = (pathname.split('/')[1] || i18n.defaultLocale) as Locale;
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <title>Mirroz: Book Decorative Mirrors Online</title>
        <meta name="description" content="Elegant mirrors for modern spaces. Book your decorative mirror today." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
