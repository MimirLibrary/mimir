import { Injectable } from '@nestjs/common';
import {
  Prisma,
  Identifier,
  Material,
  IdentifierType,
  JobStatus,
} from '@prisma/client';
import { PrismaService } from '../prisma.service';

const materialWithRelations = Prisma.validator<Prisma.MaterialArgs>()({
  include: {
    identifiers: true,
    authors: true,
    publisher: true,
  },
});

type MaterialWithRelations = Prisma.MaterialGetPayload<
  typeof materialWithRelations
>;

type Bundle = {
  material: Prisma.MaterialCreateInput;
  authors: Array<Prisma.AuthorCreateInput>;
  publisher: Prisma.PublisherCreateInput;
};

@Injectable()
export class DbService {
  constructor(private prisma: PrismaService) {}

  async logAccess(id: number) {
    return await this.prisma.identifier.update({
      data: {
        hits: {
          increment: 1,
        },
      },
      where: { id },
    });
  }

  async saveMissingISBN(isbn: string, startedAt: Date) {
    return await this.prisma.identifier.create({
      data: {
        value: isbn,
        idType: IdentifierType.ISBN_13,
        meta: {},
        material: undefined,
        job: {
          create: {
            startedAt,
            finishedAt: new Date(),
            status: JobStatus.MISS,
            meta: {},
          },
        },
      },
    });
  }

  async findMaterial(isbn: string) {
    return this.prisma.identifier.findUnique({
      where: { value: isbn },
      include: {
        material: {
          include: {
            identifiers: true,
            authors: true,
            publisher: true,
          },
        },
      },
    });
  }

  async syncMaterial(isbn: string, data: Bundle, startedAt: Date) {
    return await this.prisma.material.create({
      data: {
        ...data.material,
        identifiers: {
          create: [
            {
              value: isbn,
              idType: IdentifierType.ISBN_13, // TODO Infer
              meta: {},
              job: {
                create: {
                  startedAt,
                  finishedAt: new Date(),
                  status: JobStatus.FOUND,
                  meta: {},
                },
              },
            },
          ],
        },
        authors: {
          connectOrCreate: data.authors.map((d) => ({
            where: {
              name_referenceId: {
                name: d.name,
                referenceId: d.referenceId,
              },
            },
            create: d,
          })),
        },
        publisher: {
          connectOrCreate: {
            where: {
              name_referenceId: {
                name: data.publisher.name,
                referenceId: data.publisher.referenceId,
              },
            },
            create: data.publisher,
          },
        },
      },
    });
  }
}
