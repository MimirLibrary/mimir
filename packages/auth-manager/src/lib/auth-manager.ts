import { User, UserManager, WebStorageStateStore } from 'oidc-client';

let userManager: UserManager | null = null;

const createAppUserManager = () => {
  return new UserManager({
    authority: process.env['NX_OIDC_SERVER_URL'],
    client_id: process.env['NX_OIDC_CLIENT'],
    redirect_uri: `${window.location.origin}/auth/signin_redirect`,

    // if we choose to use popup window instead for logins
    popup_redirect_uri: `${window.location.origin}/auth/signin-callback-popup`,
    popupWindowFeatures:
      'menubar=yes,location=yes,toolbar=yes,width=1200,height=800,left=100,top=100;resizable=yes',

    // these two will be done dynamically from the buttons clicked, but are
    // needed if you want to use the silent_renew
    response_type: 'code',
    scope:
      'openid profile email basic_profile unit_profile smg_profile itechart_mimir_api',

    // this will toggle if profile endpoint is used
    loadUserInfo: true,

    // silent renew will get a new access_token via an iframe
    // just prior to the old access_token expiring (60 seconds prior)
    silent_redirect_uri: `${window.location.origin}/auth/silent_redirect`,
    automaticSilentRenew: true,

    // this will allow all the OIDC protocol claims to be visible in the window. normally a client app
    // wouldn't care about them or want them taking up space
    filterProtocolClaims: false,

    userStore: new WebStorageStateStore({ store: localStorage }),
  });
};

export const getAppUserManager = () => {
  if (!userManager) {
    userManager = createAppUserManager();
  }

  return userManager;
};

export const getOidcState = () => {
  const redirectPathParam = 'redirectPath=';
  const queryString = window.location.search;
  const redirectPathParamStartIndex = queryString.indexOf(redirectPathParam);
  if (redirectPathParamStartIndex < 0) {
    return '/';
  }
  const redirectPathParamEndIndex = queryString.indexOf(
    '&',
    redirectPathParamStartIndex
  );
  const redirectPath = decodeURIComponent(
    queryString.slice(
      redirectPathParamStartIndex + redirectPathParam.length,
      redirectPathParamEndIndex >= 0 ? redirectPathParamEndIndex : undefined
    )
  );

  return redirectPath;
};

export const setAuthTokens = (user: User): void => {
  localStorage.setItem('access_token', user.access_token);
  localStorage.setItem('id_token', user.id_token);
  localStorage.setItem('expiry_date', user.expires_at.toString());
  user.refresh_token &&
    localStorage.setItem('refresh_token', user.refresh_token);
};
