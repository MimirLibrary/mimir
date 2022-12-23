import React, { useEffect } from 'react';
import { AuthManager } from '@mimir/auth-manager';

const StartPage = () => {
  useEffect(() => {
    AuthManager.signIn();
  }, []);
  return null;
};

export default StartPage;
