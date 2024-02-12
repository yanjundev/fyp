'use client';

import { useEffect, useState, useTransition } from 'react';

import { checkIn, checkInStatus } from '@/actions/user/check-in';

import { Button } from '@/components/ui/button';

interface CheckInButtonProps {
  updateLevelInfo: () => void;
}

export const CheckInButton = ({ updateLevelInfo }: CheckInButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [disableCheckIn, setDisableCheckIn] = useState(false);

  const onCheckIn = () => {
    startTransition(() => {
      checkIn().then(() => updateLevelInfo());
    });
  };

  useEffect(() => {
    checkInStatus().then((data) => setDisableCheckIn(data));
  }, [isPending]);

  return (
    <div className='flex justify-center items-center w-full'>
      <Button variant='outline' disabled={disableCheckIn} onClick={onCheckIn}>
        check in
      </Button>
    </div>
  );
};
