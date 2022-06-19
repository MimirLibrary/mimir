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

@Resolver('Location')
export class LocationResolver {
  @Query(() => [Location])
  async getAllLocations() {
    return await Location.find();
  }

  @Mutation(() => Location)
  async createLocation(
    @Args('input') createLocationInput: CreateLocationInput
  ) {
    try {
      const { location } = createLocationInput;
      const isLocationExists = await Location.findOne(location);
      if (isLocationExists) {
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
      const isLocationExists = await Location.findOne({
        where: { id: location_id },
      });
      if (!isLocationExists) {
        return new UnauthorizedException("Location didn't exists");
      }
      await Location.delete(isLocationExists);
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
