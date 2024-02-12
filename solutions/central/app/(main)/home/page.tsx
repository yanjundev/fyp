import { PostFeed } from '@/components/post/post-feed';
import { ProfileCard } from '@/components/profile-card/profile-card';

const Home = () => {
  return (
    <div className='container flex justify-between items-start space-x-10 w-full'>
      <ProfileCard />
      <PostFeed />
    </div>
  );
};

export default Home;
