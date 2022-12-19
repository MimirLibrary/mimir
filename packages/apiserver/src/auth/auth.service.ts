import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Person } from '../resources/persons/person.entity';
import { RolesTypes } from '@mimir/global-types';
import { REQUEST } from '@nestjs/core';
import { AuthUser } from './model/auth-user';

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

  async createUser(): Promise<Person> {
    const authUser = await this.getAuthUser();
    if (!authUser) {
      throw new UnauthorizedException('Invalid token');
    }
    const person = await Person.findOne({
      where: {
        smg_id: authUser.sub,
      },
    });
    if (person) {
      this.updatePerson(person, authUser);
      return Person.save(person);
    }

    const newPerson = this.createPerson(authUser);
    return Person.save(newPerson);
  }

  private createPerson(authUser: AuthUser): Person {
    return Person.create({
      smg_id: authUser.sub,
      avatar: authUser.picture,
      email: authUser.email,
      username: this.getFullName(authUser),
      position: 'Ruby Developer',
      type: RolesTypes.READER,
    });
  }

  private updatePerson(person: Person, authUser: AuthUser): void {
    person.avatar = authUser.picture;
    person.email = authUser.email;
    person.username = this.getFullName(authUser);
  }

  private getFullName(authUser: AuthUser): string {
    return authUser.name || `${authUser.lastName} ${authUser.firstName}`;
  }
}
