import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { AuthenticatorRoute } from '@aws-amplify/ui';
import { FC, ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../util/devUtils';

interface AuthScreenProps {
  children: ReactNode;
}

type AuthGuardProps = AuthScreenProps;

export const AuthScreen: FC<AuthScreenProps> = ({ children }) => {
  const { route } = useAuthenticator((context) => [context.route]);
  const { user } = useAuthenticator((context) => [context.user]);
  const [prevRoute, setPrevRoute] = useState<AuthenticatorRoute>('idle');

  useEffect(() => {
    // Sign Up Completed
    if (route === 'transition' && prevRoute === 'confirmSignUp') {
      const accessToken = user
        ?.getSignInUserSession()
        ?.getAccessToken()
        .getJwtToken();

      axios.post(
        `${BASE_URL}/api/v1/user/create`,
        { email: user.attributes?.email },
        {
          headers: {
            'Content-Type': 'application/json',
            'cognito-token': accessToken,
          },
        },
      );
    }

    // Track route status
    setPrevRoute(route);
  }, [route]);

  return (
    <Authenticator
      Container={(props) => (
        <Authenticator.Container
          {...props}
          style={{ backgroundColor: '#f6f6f6' }}
        />
      )}
      components={{
        SignUp: ({ fields, ...props }) => {
          let customizedFields = [...fields];
          customizedFields[0] = {
            name: 'username',
            label: 'Email',
            placeholder: 'Enter your Email Address',
            required: true,
            type: 'email',
          };
          return <Authenticator.SignUp {...props} fields={customizedFields} />;
        },
        SignIn: ({ fields, ...props }) => {
          let customizedFields = [...fields];
          customizedFields[0] = {
            name: 'username',
            label: 'Email',
            placeholder: 'Enter your Email Address',
            required: true,
            type: 'email',
          };
          return <Authenticator.SignIn {...props} fields={customizedFields} />;
        },
      }}
    >
      {children}
    </Authenticator>
  );
};

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => (
  <Authenticator.Provider>
    <AuthScreen>{children}</AuthScreen>
  </Authenticator.Provider>
);
