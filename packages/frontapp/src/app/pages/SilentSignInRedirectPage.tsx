import React, { useEffect } from 'react';
import { AuthManager } from '@mimir/auth-manager';

const SilentSignInRedirectPage = () => {
  useEffect(() => {
    AuthManager.instance.signInSilentCallback();
  }, []);

  return null;
};

export default SilentSignInRedirectPage;
