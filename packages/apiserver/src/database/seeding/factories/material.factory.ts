import * as Faker from "faker";
import { define } from "typeorm-seeding";

import { Material } from "../../../resources/materials/material.entity";

define(Material, (faker: typeof Faker) => {
  const material = new Material();
  material.identifier = faker.name.firstName();
  material.id_type = faker.name.lastName();
  material.type = faker.internet.userName();
  return material;
});