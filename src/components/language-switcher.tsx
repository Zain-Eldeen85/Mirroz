'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

import { type Locale } from '@/i18n';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const pathName = usePathname();
  const router = useRouter();

  if (!pathName) {
    return (
        <Button variant="ghost" size="icon" disabled>
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
    );
  }

  const segments = pathName.split('/');
  const currentLocale = segments[1] as Locale;
  
  const toggleLocale = () => {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en';
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
      <Button variant="ghost" size="icon" onClick={toggleLocale}>
        <Globe className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Change language</span>
      </Button>
  );
}
