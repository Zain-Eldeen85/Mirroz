
'use client';

import * as React from 'react';
import Image from 'next/image';
import { BookingForm } from '@/components/booking/booking-form';
import { getMirrorById, type Mirror } from '@/lib/mirrors';
import { type Locale } from '@/i18n';
import { type Offer } from '@/lib/offers';

type BookingViewProps = {
    dictionary: any;
    mirrors: Mirror[];
    initialMirrorId?: string;
    activeOffer?: Offer;
    locale: Locale;
}

export function BookingView({ dictionary, mirrors, initialMirrorId, activeOffer }: BookingViewProps) {
  const selectedMirror = initialMirrorId ? getMirrorById(initialMirrorId) : null;
  const imageUrl = selectedMirror ? new URL(selectedMirror.image.imageUrl) : null;
  const width = imageUrl?.searchParams.get('w');
  const height = imageUrl?.searchParams.get('h');

  let finalPrice = selectedMirror?.price;
  if (selectedMirror && activeOffer && activeOffer.type === 'forced_discount') {
     if (activeOffer.appliesTo.includes('all') || activeOffer.appliesTo.includes(selectedMirror.shape)) {
        finalPrice = selectedMirror.price * (1 - activeOffer.discountPercentage / 100);
     }
  }

  const mirrorWithFinalPrice = selectedMirror ? { ...selectedMirror, price: finalPrice! } : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="order-2 md:order-1">
          <BookingForm 
            dictionary={dictionary} 
            mirrors={mirrors}
            mirror={mirrorWithFinalPrice}
            activeOffer={activeOffer}
          />
        </div>
        <div className="order-1 md:order-2">
          {selectedMirror && imageUrl ? (
            <div className="p-4 bg-white/60 dark:bg-black/5 rounded-lg border border-white/10">
              <h3 className="font-headline text-2xl mb-4 text-center">{selectedMirror.name}</h3>
              <Image 
                src={imageUrl.href}
                alt={selectedMirror.name}
                width={Number(width) || 1080}
                height={Number(height) || 1080}
                className="rounded-md object-cover w-full h-auto"
                data-ai-hint={selectedMirror.image.imageHint}
              />
            </div>
          ) : (
             <div className="flex items-center justify-center h-full p-4 bg-white/60 dark:bg-black/5 rounded-lg border border-dashed border-white/20">
                <p className="text-muted-foreground">{dictionary.BookingForm.selectMirrorPrompt}</p>
             </div>
          )}
        </div>
      </div>
  )
}
