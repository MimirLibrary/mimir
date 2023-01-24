import React, { useEffect } from 'react';
import { AuthManager } from '@mimir/auth-manager';

const SilentSignInRedirectPage = () => {
  useEffect(() => {
    AuthManager.signInSilentCallback();
  }, []);

  return null;
};

export default SilentSignInRedirectPage;
