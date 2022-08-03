import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Location } from './locations/location.entity';

export const CurrentUserLocation = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const {
      req: { headers },
    } = ctx.getContext();
    const bufB64 = Buffer.from(headers['id-token'].split('.')[1], 'base64');
    const result = JSON.parse(bufB64.toString());
    const location = await Location.createQueryBuilder('location')
      .leftJoin('location.person', 'person')
      .where('person.smg_id= :smg_id', { smg_id: result.sub })
      .orderBy('location.id', 'DESC')
      .getOne();
    return location.id;
  }
);
