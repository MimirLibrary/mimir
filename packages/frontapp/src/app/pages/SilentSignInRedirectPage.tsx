import React, { useEffect } from 'react';
import { getAppUserManager } from '@mimir/auth-manager';

const SilentSignInRedirectPage = () => {
  useEffect(() => {
    const userManager = getAppUserManager();
    userManager.signinSilentCallback();
  }, []);

  return null;
};

export default SilentSignInRedirectPage;
