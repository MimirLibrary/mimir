import * as DataLoader from 'dataloader';
import { Person } from './person.entity';

const createPersonsLoader = () => {
  return new DataLoader<number, Person>(async (ids: number[]) => {
    const persons = await Person.findByIds(ids);

    const personsMap: Record<number, Person> = persons.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

    return ids.map((id) => personsMap[id]);
  });
};

export default createPersonsLoader;
