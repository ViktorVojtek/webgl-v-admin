import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from './api';

const useToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const lsToken = localStorage.getItem('token');

    if (lsToken) {
      setToken(lsToken);
      console.log('Token exist');
    } else {
      setToken('NOT_DEFINED');
    }
  }, [token]);

  return token;
};

export const login: (email: string, password: string) => Promise<void> = async (
  email,
  password
) => {
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
      loginUser: { firstName, lastName, email: resEmail, token },
    },
  } = result as any;
  const user = {
    firstName,
    lastName,
    email: resEmail,
  };

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  window.location.href = '/';
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const withAuth = (Component): ((props: any) => JSX.Element) => (
  props
) => {
  const token = useToken();
  const router = useRouter();

  if (token === 'NOT_DEFINED') {
    router.push('/login');
  }

  return token ? (
    token === 'NOT_DEFINED' ? (
      <></>
    ) : (
      <Component {...props} />
    )
  ) : (
    <>loading</>
  );
};
