import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isLogin } from './auth';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const loggedIn = await isLogin();
        if (!loggedIn) {
          router.push('/admin/login');
        }
      };

      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;