import { Factory, Seeder } from 'typeorm-seeding';
import { Material } from '../../resources/materials/material.entity';
import { Status } from '../../resources/statuses/status.entity';
import { Person } from '../../resources/persons/person.entity';

export default class SeedDB implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Material)().createMany(10);
    await factory(Person)().createMany(10);
    await factory(Status)().createMany(10);
  }
}
