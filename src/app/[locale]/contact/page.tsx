
import { getDictionary } from '@/lib/get-dictionary';
import { type Locale } from '@/i18n';
import { GlassCard } from '@/components/ui/glass-card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <GlassCard className="p-8 md:p-12">
        <h1 className="font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dictionary.ContactPage.h1}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {dictionary.ContactPage.h2}
        </p>
        <form className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="text-lg">{dictionary.ContactPage.name}</Label>
              <Input type="text" id="name" name="name" className="mt-2 h-12 text-base" placeholder={dictionary.ContactPage.namePlaceholder} />
            </div>
            <div>
              <Label htmlFor="email" className="text-lg">{dictionary.ContactPage.email}</Label>
              <Input type="email" id="email" name="email" className="mt-2 h-12 text-base" placeholder={dictionary.ContactPage.emailPlaceholder} />
            </div>
          </div>
          <div>
            <Label htmlFor="message" className="text-lg">{dictionary.ContactPage.message}</Label>
            <Textarea id="message" name="message" rows={6} className="mt-2 text-base" placeholder={dictionary.ContactPage.messagePlaceholder} />
          </div>
          <div>
            <Button type="submit" size="lg" className="w-full font-headline text-lg shine">
              {dictionary.ContactPage.submit}
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
