import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { api } from './api';

export const useAuth = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    console.log(token);
    if (token) {
      setToken(token);
    } else {
      router.push('/login');
    }
  }, [token]);
};

/* type ContextType = {
  isAuthenticated?: boolean;
  user?: any;
  login?: (email: string, password: string) => Promise<void>;
  loading?: boolean;
  logout?: () => void;
};

const AuthContext: React.Context<ContextType> = createContext<ContextType>({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token');

      if (token) {
        console.log("Got a token in the cookies, let's see if it is valid");
        api.use(({ request, options }, next) => {
          if (!options.headers) {
            options.headers = {};
          }
          options.headers['x-access-token'] = token;
          next();
        });

        const {
          data: { auth: user },
        } = await api({
          query: `
            query {
              auth {
                firstName
                lastName
                email
              }
            }
          `,
        });

        if (user) setUser(user);
      }

      setLoading(false);
    }

    loadUserFromCookies();
  }, []);

  const login: (email: string, password: string) => Promise<void> = async (
    email,
    password
  ) => {
    try {
      console.log(email);
      console.log(password);

      const result = await api({
        query: `mutation loginUser($input: UserDataLoginInput) {
          loginUser(input: $input) {
            firstName
            lastName
            email
            token
          }
        }`,
        variables: { input: { email, password } },
      });

      console.log(result);

      const {
        data: {
          loginUser: { token, firstName, lastName, email: userEmail },
        },
      } = result;

      // const { data: token } = await api.post('auth/login', { email, password });
      if (token) {
        console.log('Got token');
        Cookies.set('token', token, { expires: 60 });
        const user = {
          firstName,
          lastName,
          email: userEmail,
        };
        // api.defaults.headers.Authorization = `Bearer ${token.token}`
        // const { data: user } = await api.get('users/me')
        setUser(user);
        console.log('Got user', user);
        // window.location.pathname = '/';
        router.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout: () => void = () => {
    Cookies.remove('token');
    setUser(null);
    // window.location.pathname = '/login';
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function ProtectRoute(Component: any) {
  return function () {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      console.log(isAuthenticated);
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated]);

    return isAuthenticated ? <Component {...arguments} /> : null;
  };
}

export default function useAuth(): ContextType {
  const context: ContextType = useContext(AuthContext);

  return context;
} */
