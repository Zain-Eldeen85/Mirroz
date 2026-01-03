
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
import { usePathname, useRouter } from 'next/navigation';
import { type Locale } from '@/i18n';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function AdminLoginPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] as Locale;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // For demo purposes, we'll just simulate a successful login.
    if (values.email && values.password) {
        sessionStorage.setItem('admin-auth', 'true');
        router.push(`/${locale}/admin`);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <GlassCard className="w-full max-w-md p-8">
        <h1 className="font-headline text-3xl font-semibold text-center mb-6">
          Admin Login
        </h1>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full font-headline text-lg" size="lg">
              Login
            </Button>
          </form>
        </Form>
      </GlassCard>
    </div>
  );
}
