import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Material } from "../../resources/materials/material.entity";

export default class CreateMaterial implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    //await factory(Material)().makeMany(3);
    await connection
      .createQueryBuilder()
      .insert()
      .into(Material)
      .values([
        { identifier: 'Timber', id_type: 'Saw', type: "type" }
      ])
      .execute()
  }
}
