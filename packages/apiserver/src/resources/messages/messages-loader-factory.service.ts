import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { In } from 'typeorm';
import {
  groupByKey,
  GroupRecord,
} from '../../utils/helpersFunctions/groupByKey';
import { Message } from './message.entity';

@Injectable()
export class MessagesLoaderFactoryService {
  public createMaterialsMessagesLoader(): DataLoader<number, Message[]> {
    return new DataLoader<number, Message[]>(async (materialIds: number[]) => {
      const messages = await Message.find({
        where: { material_id: In(materialIds) },
      });

      const messagesMap: GroupRecord<Message> = groupByKey(
        messages,
        'material_id'
      );

      return materialIds.map((id) => messagesMap[id] || []);
    });
  }

  public createPersonsMessagesLoader(): DataLoader<number, Message[]> {
    return new DataLoader<number, Message[]>(async (personIds: number[]) => {
      const messages = await Message.find({
        where: { person_id: In(personIds) },
      });

      const messagesMap: GroupRecord<Message> = groupByKey(
        messages,
        'person_id'
      );

      return personIds.map((id) => messagesMap[id] || []);
    });
  }
}
