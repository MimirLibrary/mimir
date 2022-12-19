import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  oidcServerUrl: process.env.OIDC_SERVER_URL,
  clientId: process.env.OIDC_CLIENT,
}));
