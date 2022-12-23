import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  oidcServerUrl: process.env.NX_OIDC_SERVER_URL,
  clientId: process.env.NX_OIDC_CLIENT,
  audience: process.env.NX_OIDC_AUDIENCE,
}));
