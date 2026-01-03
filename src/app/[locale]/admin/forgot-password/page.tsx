
'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GlassCard } from '@/components/ui/glass-card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/i18n';

const formSchema = z.object({
  email: z.string().email(),
});

export default function AdminForgotPasswordPage() {
  const { toast } = useToast();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] as Locale;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: 'Password Reset Requested',
      description: `If an account exists for ${values.email}, a password reset link has been sent.`,
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <GlassCard className="w-full max-w-md p-8">
        <h1 className="font-headline text-3xl font-semibold text-center mb-2">
          Forgot Password
        </h1>
        <p className="text-muted-foreground text-center mb-6">
          Enter your email to receive a reset link.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full font-headline text-lg" size="lg">
              Send Reset Link
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center">
            <Button variant="link" asChild>
                <Link href={`/${locale}/admin/login`}>Back to Login</Link>
            </Button>
        </div>
      </GlassCard>
    </div>
  );
}
