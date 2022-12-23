import React from 'react';
import Button from '../components/Button';
import { StartPageTemplate } from './StartPageTemplate';
import { AuthManager } from '@mimir/auth-manager';

const signIn = (): Promise<void> => {
  return AuthManager.signIn();
};

const StartPage = () => {
  return (
    <StartPageTemplate>
      <Button value="Sign In" invert transparent onClick={signIn} />
    </StartPageTemplate>
  );
};

export default StartPage;
