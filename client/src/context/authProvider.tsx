import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '@components/Loader';
import { IUser } from '../types';
import getUser from '../utils/getUser';

interface State {
  user: IUser | null;
  isLoading: boolean;
}

const AuthContext = createContext<State>({ user: null, isLoading: false });

const authPaths = ['/login', '/register', '/forgot_password'];

export const AuthProvider: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const onLoadUser = async () => {
      const res = await getUser();
      setUser(res);
      setIsLoading(false);
    };
    onLoadUser();
  }, [pathname]);

  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute: React.FC = ({ children }) => {
  const { user, isLoading } = useAuth();
  const { pathname, push } = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  if (!user && !authPaths.includes(pathname) && !pathname.startsWith('/reset')) {
    push('/login');
    return null;
  }
  if (user && (authPaths.includes(pathname) || pathname.startsWith('/reset'))) {
    push('/');
    return null;
  }

  return <>{children}</>;
};
