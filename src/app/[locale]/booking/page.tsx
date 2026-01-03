
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n';
import { mirrors } from '@/lib/mirrors';
import { BookingView } from '@/components/booking/booking-view';
import { offers } from '@/lib/offers';

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: { mirrorId?: string; offer?: string };
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const activeOffer = searchParams?.offer ? offers.find(o => o.id === searchParams.offer) : undefined;
  
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dictionary.BookingPage.h1}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {dictionary.BookingPage.h2}
        </p>
      </div>
      <BookingView 
        dictionary={dictionary} 
        mirrors={mirrors}
        initialMirrorId={searchParams.mirrorId}
        activeOffer={activeOffer}
        locale={locale}
      />
    </div>
  );
}
