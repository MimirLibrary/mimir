import { define } from 'typeorm-seeding';
import { Material } from '../../resources/materials/material.entity';

define(Material, () => {
  const idLength = 10000000000;
  const getRandomID = () => String(Math.floor(Math.random() * idLength));
  const typeOfId = ['ISBN', 'QR', 'Internal', 'etc'];
  const type = ['Book', 'Magazine', 'Other'];
  const getTypeOdId = () => String(typeOfId[Math.floor(Math.random() * 4)]);
  const getType = () => String(type[Math.floor(Math.random() * 3)]);

  const material = new Material();
  material.identifier = getRandomID();
  material.id_type = getTypeOdId();
  material.type = getType();
  return material;
});
