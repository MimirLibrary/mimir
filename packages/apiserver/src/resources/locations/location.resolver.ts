import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Location } from './location.entity';
import { CreateLocationInput, RemoveLocationInput } from '@mimir/global-types';
import { allowUnauthorizedRequest } from '../../auth/allowUnauthorizedRequest.decorator';
import { SkipBlock } from '../blocked-users/skipBlock.decorator';
import { ManagerGuard } from '../../auth/manager.guard';

@Resolver('Location')
export class LocationResolver {
  @Query(() => [Location])
  @allowUnauthorizedRequest()
  @SkipBlock()
  async getAllLocations() {
    return await Location.find();
  }

  @Mutation(() => Location)
  @UseGuards(ManagerGuard)
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
  @UseGuards(ManagerGuard)
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
}
