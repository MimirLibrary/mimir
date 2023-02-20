import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Person } from './person.entity';
import { getIdMap, IdRecord } from '../../utils/helpersFunctions/getIdMap';

@Injectable()
export class PersonsLoaderFactoryService {
  public createPersonsLoader(): DataLoader<number, Person> {
    return new DataLoader<number, Person>(async (ids: number[]) => {
      const persons = await Person.findByIds(ids);

      const personsMap: IdRecord<Person> = getIdMap(persons);

      return ids.map((id) => personsMap[id]);
    });
  }
}
