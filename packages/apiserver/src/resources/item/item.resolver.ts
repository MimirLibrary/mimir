import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BookInput, ProlongTimeInput } from '@mimir/global-types';
import { ItemService } from './item.service';
import { Status } from '../statuses/status.entity';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { ManagerGuard } from '../../auth/manager.guard';
import { Role } from '../../auth/role.enum';
import { CurrentUser } from '../../auth/current-user';
import { Person } from '../persons/person.entity';

class ItemError {
  constructor(public message: string) {}
}

@Resolver('BookUnionResult')
export class ItemResolver {
  constructor(private itemService: ItemService) {}

  @ResolveField()
  __resolveType(value) {
    if (value.status) {
      return 'Status';
    }
    if (value.message) {
      return 'Error';
    }
    return null;
  }

  @Mutation(() => Status)
  async claimBook(
    @Args('input') claimBookInput: BookInput
  ): Promise<Status | ItemError> {
    try {
      return await this.itemService.claim(claimBookInput);
    } catch (e) {
      console.log(e);
      return new ItemError(e.message);
    }
  }

  @Query(() => [Status])
  async getAllTakenItems(
    @Args('person_id') person_id: number,
    @CurrentUser() currentUser: Person
  ) {
    if (currentUser.type !== Role.Manager && +person_id !== +currentUser.id) {
      throw new ForbiddenException();
    }
    return this.itemService.getAllTakenItems(person_id);
  }

  @Query(() => [Status])
  async getItemsForClaimHistory(
    @Args('person_id') person_id: number,
    @CurrentUser() currentUser: Person
  ) {
    if (currentUser.type !== Role.Manager && +person_id !== +currentUser.id) {
      throw new ForbiddenException();
    }
    return this.itemService.getItemsForClaimHistory(person_id);
  }

  @Mutation(() => Status)
  async prolongClaimPeriod(
    @Args('input') prolongInput: ProlongTimeInput,
    @CurrentUser() currentUser: Person
  ): Promise<Status | ItemError> {
    try {
      if (
        currentUser.type !== Role.Manager &&
        +prolongInput.person_id !== +currentUser.id
      ) {
        throw new ForbiddenException();
      }
      return await this.itemService.prolong(prolongInput);
    } catch (e) {
      console.log(e);
      return new ItemError(e.message);
    }
  }

  @Mutation(() => Status)
  async returnItem(
    @Args('input') returnBookInput: BookInput,
    @CurrentUser() currentUser: Person
  ): Promise<Status | ItemError> {
    try {
      if (
        currentUser.type !== Role.Manager &&
        +returnBookInput.person_id !== +currentUser.id
      ) {
        throw new ForbiddenException();
      }
      return await this.itemService.return(returnBookInput);
    } catch (e) {
      console.log(e);
      return new ItemError(e.message);
    }
  }

  @Mutation(() => Status)
  @UseGuards(ManagerGuard)
  async acceptItem(
    @Args('input') acceptBookInput: BookInput
  ): Promise<Status | ItemError> {
    try {
      return await this.itemService.accept(acceptBookInput);
    } catch (e) {
      console.log(e);
      return new ItemError(e.message);
    }
  }

  @Mutation(() => Status)
  @UseGuards(ManagerGuard)
  async rejectItem(
    @Args('input') rejectBookInput: BookInput
  ): Promise<Status | ItemError> {
    try {
      return await this.itemService.reject(rejectBookInput);
    } catch (e) {
      console.log(e);
      return new ItemError(e.message);
    }
  }
}
