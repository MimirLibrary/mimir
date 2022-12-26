/*eslint @typescript-eslint/no-empty-function: ["error", { "allow": ["private-constructors"] }]*/

import {
  User,
  UserManager,
  UserManagerSettings,
  WebStorageStateStore,
} from 'oidc-client';
import { firstValueFrom, Subject } from 'rxjs';

const userManagerSettings: UserManagerSettings = {
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
  automaticSilentRenew: false,

  // this will allow all the OIDC protocol claims to be visible in the window. normally a client app
  // wouldn't care about them or want them taking up space
  filterProtocolClaims: false,

  userStore: new WebStorageStateStore({ store: localStorage }),
} as const;

export class AuthManager {
  private static _instance: AuthManager;

  public static get instance(): AuthManager {
    if (!AuthManager._instance) {
      AuthManager._instance = new AuthManager();
    }
    return AuthManager._instance;
  }

  private silentSignInSubject: Subject<User> = new Subject();
  private silentSignInInProgress = false;

  private userManager = new UserManager(userManagerSettings);

  private constructor() {}

  public signIn(): Promise<void> {
    return this.userManager.signinRedirect({ state: this.getOidcState() });
  }

  public async signInRedirectCallback(): Promise<User> {
    try {
      const oidcUserInfo = await this.userManager.signinRedirectCallback();
      this.setAuthTokens(oidcUserInfo);
      return oidcUserInfo;
    } finally {
      await this.userManager.clearStaleState();
    }
  }

  public signInSilentCallback(): Promise<User | undefined> {
    return this.userManager.signinSilentCallback();
  }

  public signOut(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  public async signInSilent(): Promise<User> {
    if (this.silentSignInInProgress) {
      return firstValueFrom(this.silentSignInSubject);
    }
    try {
      this.silentSignInInProgress = true;
      const oidcUserInfo = await this.userManager.signinSilent();
      this.setAuthTokens(oidcUserInfo);
      this.silentSignInSubject.next(oidcUserInfo);
      return oidcUserInfo;
    } catch (error) {
      this.silentSignInSubject.error(error);
      throw error;
    } finally {
      this.silentSignInInProgress = false;
      await this.userManager.clearStaleState();
    }
  }

  private getOidcState(): string {
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
  }

  private setAuthTokens(user: User): void {
    localStorage.setItem('access_token', user.access_token);
    localStorage.setItem('id_token', user.id_token);
    localStorage.setItem('expiry_date', user.expires_at.toString());
    user.refresh_token &&
      localStorage.setItem('refresh_token', user.refresh_token);
  }
}

export default AuthManager.instance;