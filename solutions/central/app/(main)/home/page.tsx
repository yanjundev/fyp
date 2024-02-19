import { ScrollArea } from '@/components/ui/scroll-area';
import { PostFeed } from '@/components/post/post-feed';
import { ProfileCard } from '@/components/profile-card/profile-card';

const Home = () => {
  return (
    <div className='container flex justify-between items-start space-x-10 w-full'>
      <ProfileCard />
      <ScrollArea className='h-[calc(100vh-5rem)] w-full'>
        <PostFeed />
      </ScrollArea>
    </div>
  );
};

export default Home;
