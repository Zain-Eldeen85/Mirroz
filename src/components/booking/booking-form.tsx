
'use client';

import * as React from 'react';
import { Calendar as CalendarIcon, Minus, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { GlassCard } from '../ui/glass-card';
import { Label } from '../ui/label';
import { useToast } from '@/hooks/use-toast';
import type { Mirror } from '@/lib/mirrors';
import { type Offer } from '@/lib/offers';
import { BookingDetailsForm, type BookingDetails } from './booking-details-form';

type BookingFormProps = {
  dictionary: any;
  mirror?: Mirror | null;
  mirrors: Mirror[];
  activeOffer?: Offer;
};

export type BookingData = {
  mirror: Mirror;
  date: Date;
  time: string;
  quantity: number;
  activeOffer?: Offer;
};

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', 
  '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'
];

export function BookingForm({ dictionary, mirror, mirrors, activeOffer }: BookingFormProps) {
  const [step, setStep] = React.useState(1);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [bookingData, setBookingData] = React.useState<BookingData | null>(null);
  const { toast } = useToast();
  
  React.useEffect(() => {
    setDate(new Date());
  }, []);

  const handleNextStep = () => {
    if (!mirror) {
      toast({
        variant: "destructive",
        title: "No Mirror Selected",
        description: "Please go back and select a mirror to book.",
      });
      return;
    }
    if (!date || !selectedTime) {
      toast({
        variant: "destructive",
        title: "Incomplete Booking",
        description: "Please select a date and time slot.",
      });
      return;
    }
    
    setBookingData({
      mirror,
      date,
      time: selectedTime,
      quantity,
      activeOffer
    });
    setStep(2);
  };

  const handleFinalBooking = (details: BookingDetails) => {
    if (!bookingData) return;

    let finalPrice = bookingData.mirror.price;
    if (bookingData.activeOffer && bookingData.activeOffer.type === 'forced_discount') {
      // The price on the mirror should already be discounted, but we double-check here.
      // This is a safeguard. The primary price calculation happens in BookingView.
      finalPrice = bookingData.mirror.price;
    }

    const subtotal = finalPrice * bookingData.quantity;
    const serviceFee = 15;
    const deliveryFee = details.paymentMethod === 'cash' ? 50 : 0;
    const total = subtotal + serviceFee + deliveryFee;

    toast({
      title: "Booking Confirmed!",
      description: `Your booking for ${bookingData.quantity}x ${bookingData.mirror.name} for $${total.toFixed(2)} is confirmed. We will contact you at ${details.email}.`,
    });
    setStep(1); // Reset to first step after booking
  };

  const handleBack = () => {
    setStep(1);
  };

  if (step === 2 && bookingData) {
    return (
      <BookingDetailsForm 
        dictionary={dictionary} 
        onSubmit={handleFinalBooking} 
        onBack={handleBack}
        bookingData={bookingData}
      />
    );
  }

  return (
    <GlassCard className="p-8">
      <div className="space-y-8">
        <div>
          <Label htmlFor="date-picker" className="font-headline text-lg">{dictionary.BookingPage.date}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date-picker"
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal mt-2 h-12 text-base',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>{dictionary.BookingForm.selectDate}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label className="font-headline text-lg">{dictionary.BookingPage.time}</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {timeSlots.length > 0 ? timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? 'default' : 'outline'}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            )) : <p className="text-muted-foreground">{dictionary.BookingForm.noSlots}</p>}
          </div>
        </div>

        <div>
          <Label className="font-headline text-lg">{dictionary.BookingPage.quantity}</Label>
          <div className="flex items-center gap-4 mt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-bold text-xl w-10 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button onClick={handleNextStep} size="lg" className="w-full font-headline text-lg shine">
          {dictionary.BookingPage.submit}
        </Button>
      </div>
    </GlassCard>
  );
}
