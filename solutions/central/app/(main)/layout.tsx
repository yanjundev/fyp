// components
import { Topbar } from '@/components/nav/top-bar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Topbar />
      {children}
    </div>
  );
}
