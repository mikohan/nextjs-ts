import { useState, useContext, createContext, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';

import { useSignInMutation } from 'lib/graphql/signin.graphql';
import { useSignUpMutation } from 'lib/graphql/signup.graphql';
import { useCurrentUserQuery } from 'lib/graphql/currentUser.graphql';

type AuthProps = {
  user: any;
  error: string;
  singIn: (email: any, password: any) => Promise<void>;
  singUp: (email: any, password: any) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<Partial<AuthProps>>({});

function useProvideAuth() {
  const client = useApolloClient();
  const router = useRouter();

  const [error, setError] = useState('');
  const { data } = useCurrentUserQuery({
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  });
  const user = data && data.currentUser;

  // Signing in and signing up
  const [signInMutation] = useSignInMutation();
  const [signUpMutation] = useSignUpMutation();

  const signIn = async (email, password) => {
    try {
      const { data } = await signInMutation({ variables: { email, password } });
      if (data.login.token && data.login.user) {
        localStorage.setItem('token', data.login.token);
        client.resetStore().then(() => {
          router.push('/');
        });
      } else {
        setError('Invalid Login');
      }
    } catch (e) {
      setError(e.message);
    }
  };
}
