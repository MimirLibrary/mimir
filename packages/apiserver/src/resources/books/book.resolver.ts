import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Material } from '../materials/material.entity';
import { BadRequestException } from '@nestjs/common';
import { Status } from '../statuses/status.entity';

@Resolver('Book')
export class BookResolver {
  @Mutation(() => Status)
  async claimBook(
    @Args('person_id') person_id: number,
    @Args('identifier') identifier: string
  ) {
    const material = await Material.findOne({ where: { identifier } });
    if (!material) {
      throw new BadRequestException(
        'This book is not registered in the library'
      );
    }
    const { id } = material;
    const statuses = await Status.find({
      where: { material_id: id, person_id },
    });
    const lastStatus = statuses[statuses.length - 1];
    if (lastStatus.status === 'Busy') {
      return new BadRequestException(
        `This book is busy or doesn't exist. Ask the manager.`
      );
    }
    return Status.createNewStatus(lastStatus, 'Busy');
  }
}
