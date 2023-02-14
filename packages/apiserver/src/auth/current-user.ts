import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Person } from '../resources/persons/person.entity';
import { getUserSubFromToken } from './token-util';

export const CurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return req.currentUser || getAuthPerson(req);
  }
);

const getAuthPerson = async (request: Request): Promise<Person> => {
  const idToken = request.headers?.['id-token'];
  const userSub = getUserSubFromToken(idToken);
  if (!userSub) {
    return null;
  }
  return Person.findOne({
    where: {
      smg_id: userSub,
    },
  });
};
