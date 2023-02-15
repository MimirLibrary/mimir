import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Person } from './person.entity';
import { getIdMap } from '../../utils/helpersFunctions/getIdMap';

@Injectable()
export class PersonsLoaderFactoryService {
  public createPersonsLoader(): DataLoader<number, Person> {
    return new DataLoader<number, Person>(async (ids: number[]) => {
      const persons = await Person.findByIds(ids);

      const personsMap: Record<number, Person> = getIdMap(persons);

      return ids.map((id) => personsMap[id]);
    });
  }
}
