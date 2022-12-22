import { setContext } from '@apollo/client/link/context';
import { AuthManager } from '@mimir/auth-manager';

export const refreshTokenLink = setContext(async () => {
  const expiryDate = localStorage.getItem('expiry_date');

  if (!expiryDate) {
    return {};
  }

  if (Date.now() > parseInt(expiryDate) * 1000) {
    await AuthManager.instance.signInSilent();
    return {};
  }
  return {};
});
