import { SetMetadata } from '@nestjs/common';

export const SkipBlock = () => SetMetadata('skipBlock', true);
