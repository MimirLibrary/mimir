import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Material } from '../materials/material.entity';
import { Status } from '../statuses/status.entity';
import { TypeSpecifierForGQL } from '../../assets/TypeSpecifierForGQL';
import { ClaimBookInput } from '@mimir/global-types';

@Resolver('Book')
export class BookResolver {
  @Mutation('claimBook')
  async claimBook(@Args('input') claimBookInput: ClaimBookInput) {
    try {
      const { identifier, person_id } = claimBookInput;
      if (!identifier) {
        throw new Error('Received identifier not recognized, please try again');
      }
      const material = await Material.findOne(identifier);
      if (!material) {
        throw new Error('This book is not registered in the library');
      }
      const { id } = material;
      const statuses = await Status.find({
        where: { material_id: id }, order: {created_at: 1}
      });
      console.log(statuses)
      const lastStatus = statuses[statuses.length - 1];
      if (!lastStatus || lastStatus.status === 'Busy') {
        throw new Error(`This book is busy or doesn't exist. Ask the manager!`);
      }
      const newStatus = await Status.createNewStatus(
        lastStatus.material_id,
        person_id,
        'Busy'
      );
      return TypeSpecifierForGQL.createTypeNameAndValue<Status>(
        'Status',
        newStatus
      );
    } catch (e) {
      return TypeSpecifierForGQL.createTypeNameAndErrorMessage(
        'ErrorMessage',
        e.message
      );
    }
  }
}
