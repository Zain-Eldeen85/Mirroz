
'use client';

import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { GlassCard } from '../ui/glass-card';
import { OrderSummary } from './order-summary';
import type { BookingData } from './booking-form';

const bookingDetailsSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  address: z.string().min(5, { message: 'Please enter a valid address.' }),
  country: z.string().min(2, { message: 'Please enter a valid country.' }),
  city: z.string().min(2, { message: 'Please enter a valid city.' }),
  paymentMethod: z.enum(['cash', 'visa', 'fawry', 'wallet'], {
    required_error: 'You need to select a payment method.',
  }),
});

export type BookingDetails = z.infer<typeof bookingDetailsSchema>;

type BookingDetailsFormProps = {
  dictionary: any;
  onSubmit: (data: BookingDetails) => void;
  onBack: () => void;
  bookingData: BookingData;
};

export function BookingDetailsForm({ dictionary, onSubmit, onBack, bookingData }: BookingDetailsFormProps) {
  const form = useForm<BookingDetails>({
    resolver: zodResolver(bookingDetailsSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      country: '',
      city: '',
    },
  });

  const paymentMethod = form.watch('paymentMethod');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="lg:order-last">
        <GlassCard className="p-4 sm:p-8">
          <h2 className="font-headline text-2xl font-semibold mb-6">{dictionary.BookingDetailsForm.h2}</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.BookingDetailsForm.name}</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.BookingDetailsForm.email}</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.BookingDetailsForm.phone}</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 123 456 7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dictionary.BookingDetailsForm.address}</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{dictionary.BookingDetailsForm.city}</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{dictionary.BookingDetailsForm.country}</FormLabel>
                      <FormControl>
                        <Input placeholder="USA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{dictionary.BookingDetailsForm.paymentMethod}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="cash" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {dictionary.BookingDetailsForm.cashOnDelivery}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="visa" />
                          </FormControl>
                          <FormLabel className="font-normal">{dictionary.BookingDetailsForm.visa}</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="fawry" />
                          </FormControl>
                          <FormLabel className="font-normal">{dictionary.BookingDetailsForm.fawry}</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="wallet" />
                          </FormControl>
                          <FormLabel className="font-normal">{dictionary.BookingDetailsForm.wallet}</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col sm:flex-row justify-between pt-4 gap-4">
                <Button type="button" variant="outline" onClick={onBack} className="w-full sm:w-auto">
                  {dictionary.BookingDetailsForm.back}
                </Button>
                <Button type="submit" size="lg" className="w-full sm:w-auto font-headline text-lg shine">
                  {dictionary.BookingDetailsForm.completeBooking}
                </Button>
              </div>
            </form>
          </Form>
        </GlassCard>
      </div>
      <div className="lg:order-first">
        <OrderSummary bookingData={bookingData} dictionary={dictionary} paymentMethod={paymentMethod} />
      </div>
    </div>
  );
}
