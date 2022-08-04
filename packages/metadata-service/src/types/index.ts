import { Prisma } from '@prisma/client';

export type Bundle = {
  material: Prisma.MaterialCreateInput;
  authors: Array<Prisma.AuthorCreateInput>;
  publisher: Prisma.PublisherCreateInput;
};
