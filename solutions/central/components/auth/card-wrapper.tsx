'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

import { SocialProviders } from '@/components/auth';
import Link from 'next/link';

interface CardWrapperProps {
  children: React.ReactNode;
  title: string;
  description: string;
  text: string;
  link: string;
  href: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  title,
  description,
  text,
  link,
  href,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className='flex flex-col justify-center mx-auto space-y-6 w-full max-w-lg'>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl text-center'>{title}</CardTitle>
          <CardDescription className='text-center'>
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>{children}</CardContent>

        {showSocial && (
          <CardFooter>
            <SocialProviders />
          </CardFooter>
        )}

        <CardFooter className='flex flex-col'>
          <p className='mt-2 text-xs text-center text-gray-700'>
            {text}{' '}
            <Link href={href} className='text-blue-600 hover:underline'>
              {link}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
