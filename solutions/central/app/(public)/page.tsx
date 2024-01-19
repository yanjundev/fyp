import { auth, signOut } from '@/auth';

const Home = async () => {
  const session = await auth();

  return <div>home for central</div>;
};

export default Home;
