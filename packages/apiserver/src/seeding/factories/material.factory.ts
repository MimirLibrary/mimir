import { define } from 'typeorm-seeding';
import { Material } from '../../resources/materials/material.entity';

define(Material, () => {
  const idLength = 10000000000;
  const getRandomID = () => String(Math.floor(Math.random() * idLength));
  const getType = (list, count) =>
    String(list[Math.floor(Math.random() * count)]);
  const listOfAuthor = [
    'Geoffrey Chaucer',
    'William Shakespeare',
    'Robert Stevenson',
  ];
  const listOfCategory = ['Psychology', 'History', 'Horror'];
  const listOfTitle = ['Dracula', 'Mr. Bean In Town', 'Forrest Gump'];
  const typeOfId = ['ISBN', 'QR', 'etc'];
  const type = ['Book', 'Magazine', 'Other'];

  const material = new Material();
  material.identifier = getRandomID();
  material.id_type = getType(typeOfId, 3);
  material.author = getType(listOfAuthor, 3);
  material.category = getType(listOfCategory, 3);
  material.title = getType(listOfTitle, 3);
  material.type = getType(type, 3);
  material.location_id = 2;
  material.description = '';
  material.picture = '';
  return material;
});
