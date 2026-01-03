
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n';
import { reviews } from '@/lib/reviews';
import { ReviewCard } from '@/components/review/review-card';
import { GlassCard } from '@/components/ui/glass-card';

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
       <GlassCard className="p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {dictionary.ReviewsPage.h1}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              {dictionary.ReviewsPage.h2}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
       </GlassCard>
    </div>
  );
}
