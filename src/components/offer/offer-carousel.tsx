
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import type { offers } from '@/lib/offers';
import type { PlaceHolderImages } from '@/lib/placeholder-images';

type Offer = (typeof offers)[0] & {
    title: string;
    description: string;
    cta: string;
    image: (typeof PlaceHolderImages)[0];
    href: string;
}

export function OfferCarousel({ offers }: { offers: Offer[] }) {
    const plugin = React.useRef(
      Autoplay({ delay: 5000, stopOnInteraction: true })
    )

  return (
    <Carousel 
        opts={{
            loop: true,
            align: 'center',
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full cursor-grab active:cursor-grabbing"
    >
      <CarouselContent>
        {offers.map((offer) => (
          <CarouselItem key={offer.id} className="basis-full">
            <Link href={offer.href} className="block group">
                <GlassCard className="overflow-hidden mx-auto max-w-7xl">
                <div className="relative aspect-[21/9] w-full">
                    <Image
                        src={offer.image.imageUrl}
                        alt={offer.image.description}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                        data-ai-hint={offer.image.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 md:p-12 flex flex-col justify-end items-start text-start rtl:items-end rtl:text-right">
                        <h3 className="font-headline text-3xl md:text-5xl font-semibold text-white">{offer.title}</h3>
                        <p className="mt-2 md:mt-4 text-base md:text-xl text-white/90 max-w-2xl">{offer.description}</p>
                        <Button size="lg" className="mt-6 md:mt-8 shine font-headline pointer-events-none text-lg">
                            {offer.cta}
                        </Button>
                    </div>
                </div>
                </GlassCard>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
