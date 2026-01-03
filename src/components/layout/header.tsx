
'use client';
import Link from 'next/link';
import * as React from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n';
import { Logo } from '@/components/brand/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { ClientOnly } from '../client-only';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

export function Header({ locale }: { locale: Locale }) {
  const [dictionary, setDictionary] = React.useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchDictionary = async () => {
      const dict = await getDictionary(locale);
      setDictionary(dict);
    };
    fetchDictionary();
  }, [locale]);
  
  if (!dictionary) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Logo locale={locale} />
            </div>
        </header>
    );
  }

  const navLinks = [
    { href: `/${locale}`, label: dictionary.Header.home },
    { href: `/${locale}/categories`, label: dictionary.Header.categories },
    { href: `/${locale}/reviews`, label: dictionary.Header.reviews },
    { href: `/${locale}/faq`, label: dictionary.Header.faq },
    { href: `/${locale}/contact`, label: dictionary.Header.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo locale={locale} />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-4">
          {navLinks.map(link => (
             <Button variant="ghost" asChild key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ClientOnly>
            <LanguageSwitcher />
            <ThemeToggle />
          </ClientOnly>
          {/* Mobile Navigation */}
          <div className="md:hidden">
             <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs bg-background">
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center p-4 border-b">
                             <Logo locale={locale} />
                             <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                                <X className="h-6 w-6" />
                                <span className="sr-only">Close menu</span>
                            </Button>
                        </div>
                        <nav className="flex-grow flex flex-col p-4 space-y-2">
                            {navLinks.map(link => (
                                <Button variant="ghost" asChild key={link.href} className="justify-start text-lg" onClick={() => setIsMenuOpen(false)}>
                                    <Link href={link.href}>{link.label}</Link>
                                </Button>
                            ))}
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
