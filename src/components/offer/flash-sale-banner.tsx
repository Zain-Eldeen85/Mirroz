
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import type { Offer } from '@/lib/offers';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

type FlashSaleBannerProps = {
  offer: Offer & {
    title: string;
    description: string;
    cta: string;
    image: ImagePlaceholder;
    href: string;
  };
  dictionary: any;
};

const calculateTimeLeft = (expiresAt: string) => {
  const difference = +new Date(expiresAt) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft as { days: number; hours: number; minutes: number; seconds: number } | null;
};

export function FlashSaleBanner({ offer, dictionary }: FlashSaleBannerProps) {
  const [timeLeft, setTimeLeft] = React.useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    if (offer.expiresAt) {
      setTimeLeft(calculateTimeLeft(offer.expiresAt));
      
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(offer.expiresAt!));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [offer.expiresAt]);

  const timerComponents = timeLeft ? Object.entries(timeLeft).map(([interval, value]) => {
    if (value === undefined || value < 0) return null;
    return (
      <div key={interval} className="flex flex-col items-center">
        <span className="font-headline text-3xl font-bold">{String(value).padStart(2, '0')}</span>
        <span className="text-xs uppercase">{interval}</span>
      </div>
    );
  }) : [];
  
  if (!isClient) {
      return (
        <div className="w-full">
            <GlassCard className="overflow-hidden">
                <div className="relative aspect-[4/3] md:aspect-[24/9] w-full">
                    <Image
                    src={offer.image.imageUrl}
                    alt={offer.image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={offer.image.imageHint}
                    priority
                    />
                    <div className={cn(
                      "absolute inset-0 p-6 md:p-12 flex flex-col justify-center",
                      "text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent",
                      "sm:bg-gradient-to-r sm:from-black/80 sm:via-black/60 sm:to-transparent",
                      "sm:w-3/4 lg:w-2/3",
                      "items-center text-center sm:items-start sm:text-start",
                      "rtl:sm:bg-gradient-to-l"
                    )}>
                        <h3 className="font-headline text-3xl md:text-4xl font-semibold">{offer.title}</h3>
                        <p className="mt-2 text-lg text-white/90">{offer.description}</p>
                        <div className="my-6 h-10" />
                        <Button asChild size="lg" className="shine font-headline text-lg">
                            <Link href={offer.href}>{offer.cta}</Link>
                        </Button>
                    </div>
                </div>
            </GlassCard>
        </div>
      );
  }

  return (
    <div className="w-full">
        <GlassCard className="overflow-hidden">
            <Link href={offer.href} className="block group">
            <div className="relative aspect-[4/3] md:aspect-[24/9] w-full">
                <Image
                src={offer.image.imageUrl}
                alt={offer.image.description}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                data-ai-hint={offer.image.imageHint}
                priority
                />
                <div className={cn(
                      "absolute inset-0 p-6 md:p-12 flex flex-col justify-end sm:justify-center",
                      "text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent",
                      "sm:bg-gradient-to-r sm:from-black/80 sm:via-black/60 sm:to-transparent",
                      "sm:w-3/4 lg:w-2/3",
                      "items-center text-center sm:items-start sm:text-start",
                      "rtl:sm:bg-gradient-to-l"
                    )}>
                  <h3 className="font-headline text-3xl md:text-4xl font-semibold">{offer.title}</h3>
                  <p className="mt-2 text-lg text-white/90">{offer.description}</p>
                  
                  <div className="my-6 flex gap-4 text-white">
                      {timerComponents.length > 0 ? timerComponents : <span>{dictionary.FlashSale.ended}</span>}
                  </div>
                  
                  <Button size="lg" className="shine font-headline text-lg pointer-events-none" disabled={!timerComponents.length}>
                      {offer.cta}
                  </Button>
                </div>
            </div>
        </Link>
        </GlassCard>
    </div>
  );
}
