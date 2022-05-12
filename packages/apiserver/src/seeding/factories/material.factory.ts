import { define } from 'typeorm-seeding';
import { Material } from '../../resources/materials/material.entity';

define(Material, () => {
  const idLength = 10000000000;
  const idInternalLength = 100;
  const getRandomID = () => String(Math.floor(Math.random() * idLength));
  const getInternalID = () => Math.floor(Math.random() * idInternalLength);
  const typeOfId = ['ISBN', 'another type'];
  const getTypeOdId = () => String(typeOfId[Math.floor(Math.random() * 2)]);

  const material = new Material();
  material.identifier = getRandomID();
  material.id_internal = getInternalID();
  material.id_type = getTypeOdId();
  material.type = 'some type';
  return material;
});
