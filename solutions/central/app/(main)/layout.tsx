// components
import { Toaster } from '@/components/ui/toaster';
import { Topbar } from '@/components/nav/top-bar';
import { SessionProvider } from 'next-auth/react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className='flex flex-col justify-center items-center'>
        <Topbar />
        {children}
        <Toaster />
      </div>
    </SessionProvider>
  );
}
