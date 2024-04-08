import { Card, CardContent } from '../ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';

export const ActivityCard = ({
  index,
  name,
  weight,
  time,
  reps,
}: ActivityCardProps) => {
  return (
    <Card>
      <CardContent className='flex space-x-5'>
        {/* <p>name: {name}</p> */}
        <p>weight: {weight}</p>
        <p>time: {time}</p>
        <p>reps: {reps}</p>
      </CardContent>
    </Card>
  );
};

interface ActivityCardProps {
  index: number;
  name: string;
  weight?: string;
  time?: string;
  reps?: string;
}
