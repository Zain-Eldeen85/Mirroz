
'use client';

import { type Locale } from "@/i18n";
import { Logo } from "@/components/brand/logo";
import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";
import { useEffect, useState } from "react";

export function Footer({ locale }: { locale: Locale }) {
  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const dict = await getDictionary(locale);
      setDictionary(dict);
    };
    fetchDictionary();
  }, [locale]);

  if (!dictionary) {
    return (
        <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 py-12 px-4 sm:px-6 lg:px-8 md:grid-cols-4">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <Logo locale={locale} />
                     <p className="text-sm text-muted-foreground text-center md:text-left">
                        &copy; {new Date().getFullYear()} Mirroz. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
  }

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 py-12 px-4 sm:px-6 lg:px-8 md:grid-cols-4">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Logo locale={locale} />
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Mirroz. All rights reserved.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-4 text-center md:text-left">
          <div>
            <h3 className="font-semibold text-foreground">
              {dictionary.Footer.products}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href={`/${locale}/categories`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {dictionary.Footer.categories}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {dictionary.Footer.company}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href={`/${locale}/reviews`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {dictionary.Footer.reviews}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {dictionary.Footer.support}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {dictionary.Footer.contact}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/faq`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {dictionary.Footer.faq}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {dictionary.Footer.legal}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {dictionary.Footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/policies`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {dictionary.Footer.policies}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
