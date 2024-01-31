'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState, useTransition } from 'react';

import { checkIn, checkInStatus } from '@/actions/user/check-in';

import { Button } from '@/components/ui/button';

interface CheckInButtonProps {
  updateLevel: Dispatch<SetStateAction<string>>;
  updateExp: Dispatch<SetStateAction<string>>;
  updateThreshold: Dispatch<SetStateAction<string>>;
}

export const CheckInButton = ({
  updateLevel,
  updateExp,
  updateThreshold,
}: CheckInButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [disableCheckIn, setDisableCheckIn] = useState(false);

  const onCheckIn = () => {
    startTransition(() => {
      checkIn().then((info) => {
        if (info) {
          updateLevel(info.level);
          updateExp(info.exp);
          updateThreshold(info.threshold);
        }
      });
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
