import { UserIcon } from '@/components/user-icon';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface UserInfoProps {
  name: string;
  level: string;
  exp: string;
  threshold: string;
}

export const UserInfo = ({ name, level, exp, threshold }: UserInfoProps) => {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex gap-3 w-full items-end'>
        <div className='flex-grow'>
          <UserIcon imageSize={20} iconSize={10} />
        </div>

        <div className='flex flex-grow flex-col w-full gap-2'>
          <span className='text-lg'>{name}</span>

          <div className='flex justify-between items-center w-full'>
            <Badge variant='default' className='text-sm'>
              lv {level}
            </Badge>
            <p>
              {exp}/{threshold}
            </p>
          </div>
        </div>
      </div>

      <Progress value={(Number(exp) / Number(threshold)) * 100} />
    </div>
  );
};
