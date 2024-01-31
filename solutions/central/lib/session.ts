import { auth } from '@/auth';
import { getUser } from '@/lib/services/user';
import { isDateToday } from '@/lib/utils';

export const getCurrentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const getCurrentUserName = async () => {
  const session = await auth();

  return session?.user.username;
};

export const getCurrentUserRole = async () => {
  const session = await auth();

  return session?.user.role;
};

export const getHasCheckedIn = async () => {
  const user = await getUser();

  if (user?.lastCheckIn) {
    const isToday = isDateToday(user.lastCheckIn);

    if (isToday) {
      return true;
    }
  }

  return false;
};
