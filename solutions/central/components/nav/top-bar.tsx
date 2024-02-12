'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { AccountDropdown, BellDropdown, CreateButton } from '@/components/nav';

import { cn } from '@/lib/utils';

const routes = [
  { path: '/home', name: 'home' },
  { path: '/explore', name: 'explore' },
  { path: '/plans', name: 'plans' },
];

export const Topbar = () => {
  const pathname = usePathname();

  return (
    <header className='sticky top-0 w-full'>
      <div className='container flex justify-between items-center max-w-screen-2xl h-20'>
        <span className='text-lg'>central</span>

        <NavigationMenu>
          <NavigationMenuList>
            {routes.map((route) => (
              <NavigationMenuItem key={route.name}>
                <Link
                  href={route.path}
                  className={cn(
                    'transition-colors hover:text-foreground/80',
                    pathname?.startsWith(route.path)
                      ? 'text-foreground'
                      : 'text-foreground/60',
                    navigationMenuTriggerStyle(),
                  )}
                >
                  {route.name}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className='flex justify-between items-center w-28'>
          <CreateButton />
          <BellDropdown />
          <AccountDropdown />
        </div>
      </div>
    </header>
  );
};
