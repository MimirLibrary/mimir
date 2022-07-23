import { SetMetadata } from '@nestjs/common';

export const allowUnauthorizedRequest = () =>
  SetMetadata('allowUnauthorizedRequest', true);
