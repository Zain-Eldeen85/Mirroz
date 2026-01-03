
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { type Locale } from '@/i18n';
import { type Mirror } from '@/lib/mirrors';
import { Button } from '@/components/ui/button';
import { GlassCard } from '../ui/glass-card';
import { Badge } from '@/components/ui/badge';

type MirrorCardProps = {
  mirror: Mirror;
  locale: Locale;
  dictionary: any;
  forcedDiscountPercentage?: number;
  offerId?: string;
};

export function MirrorCard({ mirror, locale, dictionary, forcedDiscountPercentage, offerId }: MirrorCardProps) {
  const imageUrl = new URL(mirror.image.imageUrl);
  const width = imageUrl.searchParams.get('w');
  const height = 4/5 * (Number(width) || 1080);

  const basePrice = mirror.price;
  let finalPrice = basePrice;
  let originalPriceForDisplay = mirror.originalPrice;
  let totalDiscountPercentage = 0;

  if (forcedDiscountPercentage) {
    finalPrice = finalPrice * (1 - forcedDiscountPercentage / 100);
    if (!originalPriceForDisplay || originalPriceForDisplay <= finalPrice) {
      originalPriceForDisplay = basePrice;
    }
  }

  const hasAnyDiscount = originalPriceForDisplay && originalPriceForDisplay > finalPrice;
  
  if (hasAnyDiscount) {
    totalDiscountPercentage = Math.round(((originalPriceForDisplay! - finalPrice) / originalPriceForDisplay!) * 100);
  }

  const linkHref = `/${locale}/mirrors/${mirror.id}${offerId ? `?offer=${offerId}` : ''}`;

  return (
    <GlassCard className="group overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <Link href={linkHref} className="block">
        <div className="overflow-hidden relative">
          <Image
            src={imageUrl.href}
            alt={mirror.name}
            width={Number(width) || 1080}
            height={height}
            className="w-full h-auto object-cover aspect-[4/5] transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={mirror.image.imageHint}
          />
          {hasAnyDiscount && totalDiscountPercentage > 0 && (
            <Badge variant="destructive" className="absolute top-4 right-4">
              {totalDiscountPercentage}% OFF
            </Badge>
          )}
        </div>
        <div className="p-6">
          <h3 className="font-headline text-xl font-medium text-foreground">
            {mirror.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground h-10">
            {mirror.image.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div>
               {hasAnyDiscount ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground line-through">
                    ${originalPriceForDisplay!.toFixed(2)}
                  </span>
                  <span className="font-headline text-lg font-semibold text-primary">
                    ${finalPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                 <p className="text-sm text-muted-foreground">
                    {dictionary.MirrorCard.startingAt}{' '}
                    <span className="font-headline text-lg font-semibold text-primary">
                        ${finalPrice.toFixed(2)}
                    </span>
                </p>
              )}
            </div>
            <Button variant="ghost" size="sm">
              {dictionary.MirrorCard.viewDetails}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </Link>
    </GlassCard>
  );
}
