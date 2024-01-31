import type { Metadata } from 'next';

import { LoginForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'login',
  description: 'sign into your central account.',
};

const Login = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='relative inset-x-0 bg-amber-300 pb-2/3'>
        <div className='absolute bottom-1/4 pl-5 text-xl font-light lg:bottom-2/5 lg:pl-16'>
          <h2 className='text-3xl lg:text-4xl'>
            welcome to <span className='font-normal'>central</span>
          </h2>
          <p className='mt-1 lg:text-2xl'>create an account to continue</p>
        </div>
      </div>

      <div className='relative -mt-1/12'>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
