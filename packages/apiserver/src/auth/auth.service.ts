import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Person } from '../resources/persons/person.entity';
import { Location } from '../resources/locations/location.entity';
import { RolesTypes } from '@mimir/global-types';
import { REQUEST } from '@nestjs/core';
import { AuthUser } from './model/auth-user';
import { BlockedUsers } from '../resources/blocked-users/blocked-users.entity';
import { BaseEntity } from 'typeorm';

export type User = Omit<Person, keyof BaseEntity> & {
  blocked: boolean;
  userRole: string;
  location?: Location[];
};

@Injectable()
export class AuthService {
  private get token(): string | undefined {
    return this.request.headers['id-token'];
  }

  constructor(@Inject(REQUEST) private request) {}

  async getAuthUser(): Promise<AuthUser | null> {
    const token = this.token;
    if (!token) {
      return null;
    }
    const bufB64 = Buffer.from(token.split('.')[1], 'base64');
    return JSON.parse(bufB64.toString());
  }

  async createPerson(): Promise<User> {
    const authUser = await this.getAuthUser();
    if (!authUser) {
      throw new UnauthorizedException('Invalid token');
    }
    const person = await Person.findOne({
      where: {
        smg_id: authUser.smg_profile_id,
      },
      relations: ['location'],
    });
    if (person) {
      const state = await BlockedUsers.findOne({
        where: {
          person_id: person.id,
        },
      });
      return {
        ...person,
        userRole: person.type,
        blocked: state?.state,
      };
    }

    const newPerson = await this.savePerson(authUser);
    return {
      ...newPerson,
      userRole: newPerson.type,
      blocked: false,
    };
  }

  private savePerson(authUser: AuthUser): Promise<Person> {
    const newPerson = Person.create({
      smg_id: authUser.smg_profile_id,
      avatar: authUser.picture,
      email: authUser.email,
      username: authUser.display_name,
      position: authUser.title_role,
      type: RolesTypes.READER,
    });
    return Person.save(newPerson);
  }
}
