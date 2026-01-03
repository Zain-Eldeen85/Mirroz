import Link from 'next/link';
import { cn } from '@/lib/utils';
import { type Locale } from '@/i18n';

export function Logo({ locale }: { locale: Locale }) {
  return (
    <Link href={`/${locale}`} className="flex items-center justify-center">
      <div className="relative font-headline text-3xl font-bold tracking-tighter text-foreground">
        <span className="text-reflection">Mirroz</span>
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 -z-10 bg-gradient-to-br from-primary/50 to-secondary/50 blur-sm dark:from-primary/20 dark:to-secondary/20"></div>
      </div>
    </Link>
  );
}
