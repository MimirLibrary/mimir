import { BadRequestException, Injectable } from '@nestjs/common';
import { Person } from './person.entity';
import { log } from 'util';
import { RolesTypes } from '@mimir/global-types';

@Injectable()
export class PersonService {
  async getAllPersons(username: string, locations: Array<number>) {
    try {
      const persons = await Person.createQueryBuilder('person')
        .leftJoinAndSelect('person.location', 'location')
        .where(`${username ? 'person.username ILIKE :name' : ''}`, {
          name: `%${username}%`,
        })
        .andWhere('person.type = :type', { type: RolesTypes.READER })
        .orderBy('person.username', 'ASC')
        .addOrderBy('person.id', 'ASC')
        .getMany();
      const filterPersons = persons.filter((person) =>
        person.location.some((location) => locations.includes(location.id))
      );
      return filterPersons;
    } catch (e) {
      return new BadRequestException(e.message);
    }
  }
}
