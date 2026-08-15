import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import { LocaleProvider } from '@/components/providers/LocaleProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import AuthCodeHandler from '@/components/auth/AuthCodeHandler';
import ProgressSync from '@/components/auth/ProgressSync';

export const metadata: Metadata = {
  title: 'AI ROADMAP — De zéro à expert',
  description:
    'Le GPS pour apprendre et maîtriser l\'intelligence artificielle.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body
        className="min-h-screen bg-white text-slate-900 antialiased dark:bg-[#020204] dark:text-slate-100"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LocaleProvider>
            <AuthCodeHandler />
            <ProgressSync />
            <ConditionalLayout>{children}</ConditionalLayout>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}