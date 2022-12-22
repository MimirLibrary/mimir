import React from 'react';
import Button from '../components/Button';
import { getAppUserManager, getOidcState } from '@mimir/auth-manager';
import { StartPageTemplate } from './StartPageTemplate';

const userManager = getAppUserManager();

const signIn = (): Promise<void> => {
  return userManager.signinRedirect({ state: getOidcState() });
};

const StartPage = () => {
  return (
    <StartPageTemplate>
      <Button value="Sign In" invert transparent onClick={signIn} />
    </StartPageTemplate>
  );
};

export default StartPage;
