
'use client';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { type Locale } from '@/i18n';
import { usePathname, useParams } from 'next/navigation';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = params.locale as Locale;
  const pathname = usePathname();
  const isAdminRoute = pathname.includes(`/${locale}/admin`);


  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
        <Header locale={locale} />
        <main className="flex-grow">{children}</main>
        <Footer locale={locale} />
    </div>
  );
}
