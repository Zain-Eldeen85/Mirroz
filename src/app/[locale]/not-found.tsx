
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n';

export default async function NotFound() {
  // The not-found page doesn't receive locale params, so we default to 'en'
  const dictionary = await getDictionary('en'); 
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-background p-4 text-center">
      <GlassCard className="max-w-md p-8 md:p-12">
        <h1 className="font-headline text-8xl font-bold text-primary">404</h1>
        <h2 className="mt-4 font-headline text-3xl font-semibold text-foreground">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Button asChild size="lg" className="mt-8 font-headline text-lg shine">
          <Link href={`/`}>Go back home</Link>
        </Button>
      </GlassCard>
    </div>
  );
}
