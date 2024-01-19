// global styles
import '../globals.css';

// font
import { Inter } from 'next/font/google';

// types
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'central',
  description: 'where fitness meets community',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} font-sans antialiased bg-background`}
      >
        <div className='flex flex-col min-h-screen'>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
