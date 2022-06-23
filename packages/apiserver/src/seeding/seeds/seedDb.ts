import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Material } from '../../resources/materials/material.entity';
import { Status } from '../../resources/statuses/status.entity';
import { Person } from '../../resources/persons/person.entity';
import { Location } from '../../resources/locations/location.entity';

export default class SeedDB implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Location)
      .values([
        { location: 'Minsk, Tolstoy str. 10' },
        { location: 'Gomel' },
        { location: 'Tashkent' },
      ])
      .execute();
    await factory(Material)().createMany(10);
    await factory(Person)().createMany(10);
    await factory(Status)().createMany(10);
  }
}
