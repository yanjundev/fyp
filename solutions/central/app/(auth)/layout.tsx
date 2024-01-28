// types
import type { Metadata } from 'next';

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
    <div className='flex flex-col min-h-screen'>
      <main>{children}</main>
    </div>
  );
}
