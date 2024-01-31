// global styles
import './globals.css';

// font
import { Inter } from 'next/font/google';

// session
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

// types
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'central',
  description: 'where fitness meets community',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </SessionProvider>
  );
}
