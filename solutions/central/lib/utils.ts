import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { getFollowing, getProfileId } from '@/lib/dao/profile';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isDateToday(date: Date) {
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export async function filterFollowing(array: any[]) {
  const following = await getFollowing();

  const filtered = array.filter((post) => {
    return following?.every((f) => post.authorId !== f?.profileId);
  });

  return filtered;
}

export async function filterUser(array: any[]) {
  const profileId = await getProfileId();

  const filtered = array.filter((id) => id !== profileId);

  return filtered;
}
