import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Location } from './location.entity';
import { Person } from '../persons/person.entity';
import { CreateLocationInput, RemoveLocationInput } from '@mimir/global-types';
import { allowUnauthorizedRequest } from '../../auth/allowUnauthorizedRequest.decorator';
import { SkipBlock } from '../blocked-users/skipBlock.decorator';

@Resolver('Location')
export class LocationResolver {
  @Query(() => [Location])
  @allowUnauthorizedRequest()
  @SkipBlock()
  async getAllLocations() {
    return await Location.find();
  }

  @Mutation(() => Location)
  async createLocation(
    @Args('input') createLocationInput: CreateLocationInput
  ) {
    try {
      const { location } = createLocationInput;
      const foundLocation = await Location.findOne(location);
      if (foundLocation) {
        return new UnauthorizedException('Location already exists');
      }
      const locationPiece = Location.create(createLocationInput);
      await Location.save(locationPiece);
      return locationPiece;
    } catch (e) {
      return new BadRequestException();
    }
  }

  @Mutation(() => Location)
  async removeLocation(
    @Args('input') removeLocationInput: RemoveLocationInput
  ) {
    try {
      const { location_id } = removeLocationInput;
      const foundLocation = await Location.findOne({
        where: { id: location_id },
      });
      if (!foundLocation) {
        return new UnauthorizedException("Location didn't exists");
      }
      await Location.delete(foundLocation);
      return foundLocation;
    } catch (e) {
      return new BadRequestException();
    }
  }

  @ResolveField(() => [Person])
  async persons(@Parent() person: Person) {
    const { id } = person;
    return Person.find({ where: { person_id: id } });
  }
}
