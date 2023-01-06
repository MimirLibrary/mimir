import * as DataLoader from 'dataloader';
import { Material } from './material.entity';
import { In } from 'typeorm';

const createMaterialsByPersonsLoader = () => {
  return new DataLoader<number, Material[]>(async (personIds: number[]) => {
    const materials = await Material.find({
      where: { currentPersonId: In(personIds) },
    });

    const materialsMap: Record<number, Material[]> = materials.reduce(
      (acc, curr) => {
        if (acc[curr.currentPersonId]) {
          acc[curr.currentPersonId].push(curr);
        } else {
          acc[curr.currentPersonId] = [curr];
        }
        return acc;
      },
      {}
    );

    return personIds.map((personId) => materialsMap[personId]);
  });
};

export default createMaterialsByPersonsLoader;
