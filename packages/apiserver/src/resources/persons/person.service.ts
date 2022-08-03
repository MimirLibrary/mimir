import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Person } from './person.entity';
import { Location } from '../locations/location.entity';

@Injectable()
export class PersonService {
  constructor(private connection: Connection) {}

  async getAllPersons(username: string, location: Location) {
    try {
      return await Person.createQueryBuilder('person')
        .leftJoinAndSelect('person.location', 'location')
        .where(
          `person.location_id= :location ${
            username ? 'AND person.username ILIKE :name' : ''
          }`,
          {
            location: location.id,
            name: `%${username}%`,
          }
        )
        .orderBy('person.username', 'ASC')
        .getMany();
    } catch (e) {
      return new BadRequestException();
    }
  }
}
