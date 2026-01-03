import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n';
import { GlassCard } from '@/components/ui/glass-card';

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <GlassCard className="p-8 md:p-12">
        <h1 className="font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dictionary.Footer.faq}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          This is a placeholder page for the FAQ.
        </p>
      </GlassCard>
    </div>
  );
}
