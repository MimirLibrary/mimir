import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";

import { Material } from "../../../resources/materials/material.entity";

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Material)().createMany(3);
  }
}
