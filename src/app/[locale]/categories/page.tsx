
import { Suspense } from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n';
import { mirrors } from '@/lib/mirrors';
import { MirrorCardSkeleton } from '@/components/skeletons/mirror-card-skeleton';
import { ProductList } from '@/components/product/product-list';

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dictionary.Footer.categories}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {dictionary.CategoriesPage.h2}
        </p>
      </div>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <MirrorCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <ProductList mirrors={mirrors} locale={locale} dictionary={dictionary} />
      </Suspense>
    </div>
  );
}
