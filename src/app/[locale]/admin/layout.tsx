
'use client';

import * as React from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { BarChart, Image, Tag, Ticket, Package, LogOut, PanelLeft, Home } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Logo } from '@/components/brand/logo';
import { type Locale } from '@/i18n';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = params.locale as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const session = sessionStorage.getItem('admin-auth');
    const publicAuthRoutes = [
        `/${locale}/admin/login`,
        `/${locale}/admin/signup`,
        `/${locale}/admin/forgot-password`,
    ];

    if (session === 'true') {
      setIsAuthenticated(true);
    } else if (!publicAuthRoutes.includes(pathname)) {
      router.push(`/${locale}/admin/login`);
    }
    setIsLoading(false);
  }, [router, locale, pathname]);
  
  const handleLogout = () => {
    sessionStorage.removeItem('admin-auth');
    setIsAuthenticated(false);
    router.push(`/${locale}/admin/login`);
  };
  
  const isPublicAuthRoute = [
    `/${locale}/admin/login`,
    `/${locale}/admin/signup`,
    `/${locale}/admin/forgot-password`,
  ].includes(pathname);

  if (isLoading) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="p-4">Loading...</div>
        </div>
    );
  }

  if (isPublicAuthRoute) {
    if (isAuthenticated) {
        router.push(`/${locale}/admin`);
        return null;
    }
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow flex items-center justify-center">{children}</main>
        </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar side="left" variant="inset" collapsible="icon">
          <SidebarHeader>
             <div className="flex items-center gap-2">
               <Logo locale={locale} />
             </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href={`/${locale}/admin`} tooltip="Analytics">
                  <BarChart />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href={`/${locale}/admin/products`} tooltip="Products">
                  <Package />
                  <span>Products</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton href={`/${locale}/admin/categories`} tooltip="Categories">
                  <Tag />
                  <span>Categories</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton href={`/${locale}/admin/offers`} tooltip="Offers">
                  <Ticket />
                  <span>Offers</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton href={`/${locale}/admin/media`} tooltip="Media">
                  <Image />
                  <span>Media</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href={`/${locale}`} tooltip="Back to Site">
                  <Home />
                  <span>Back to Site</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
              <SidebarTrigger className="md:hidden"/>
              <div className="flex-1">
                  <h1 className="font-semibold text-lg">Admin Dashboard</h1>
              </div>
              <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                  <ThemeToggle />
              </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
