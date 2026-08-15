'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import type { ReactNode } from 'react';

export default function ConditionalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');
  const isDashboardOrChallenge = pathname === '/dashboard' || pathname === '/challenge';

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className="relative z-10">{children}</main>
      {!isAuthPage && !isDashboardOrChallenge && <Footer />}
    </>
  );
}