
'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Separator } from '@/components/ui/separator';
import type { BookingData } from './booking-form';

type OrderSummaryProps = {
  bookingData: BookingData;
  dictionary: any;
  paymentMethod?: string;
};

export function OrderSummary({ bookingData, dictionary, paymentMethod }: OrderSummaryProps) {
  const { mirror, quantity } = bookingData;
  const subtotal = mirror.price * quantity;
  const deliveryFee = paymentMethod === 'cash' ? 50 : 0;
  const serviceFee = 15; // Fixed service fee
  const total = subtotal + deliveryFee + serviceFee;

  const DetailItem = ({ label, value, isCurrency = false }: { label: string; value: string | number, isCurrency?: boolean }) => (
    <div className="flex justify-between py-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{isCurrency ? `$${Number(value).toFixed(2)}` : value}</dd>
    </div>
  );

  return (
    <GlassCard className="p-8">
      <h2 className="font-headline text-2xl font-semibold mb-6">{dictionary.OrderSummary.title}</h2>
      <dl className="space-y-4">
        <div>
          <DetailItem label={dictionary.OrderSummary.item} value={mirror.name} />
          <DetailItem label={dictionary.OrderSummary.quantity} value={quantity} />
          <DetailItem label={dictionary.OrderSummary.price} value={mirror.price} isCurrency />
        </div>
        <Separator />
        <div>
          <DetailItem label={dictionary.OrderSummary.subtotal} value={subtotal} isCurrency />
          {paymentMethod === 'cash' && (
            <DetailItem label={dictionary.OrderSummary.deliveryFee} value={deliveryFee} isCurrency />
          )}
          <DetailItem label={dictionary.OrderSummary.serviceFee} value={serviceFee} isCurrency />
        </div>
        <Separator />
        <div>
          <div className="flex justify-between py-2">
            <dt className="text-lg font-headline text-foreground">{dictionary.OrderSummary.total}</dt>
            <dd className="text-xl font-headline font-bold text-primary">${total.toFixed(2)}</dd>
          </div>
        </div>
      </dl>
    </GlassCard>
  );
}
