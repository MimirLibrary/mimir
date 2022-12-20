import { setContext } from '@apollo/client/link/context';
import { getAppUserManager, setAuthTokens } from '@mimir/auth-manager';

export const refreshTokenLink = setContext(async () => {
  const expiryDate = localStorage.getItem('expiry_date');

  if (!expiryDate) {
    return {};
  }

  if (Date.now() > parseInt(expiryDate) * 1000) {
    const userManager = getAppUserManager();
    const oidcUserInfo = await userManager.signinSilent();
    setAuthTokens(oidcUserInfo);
    await userManager.clearStaleState();
    return {};
  }
  return {};
});
