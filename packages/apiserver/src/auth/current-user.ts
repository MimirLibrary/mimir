import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Person } from '../resources/persons/person.entity';

export const CurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return getAuthPerson(req);
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

const getUserSubFromToken = (idToken: string): string => {
  if (!idToken) {
    return null;
  }
  const bufB64 = Buffer.from(idToken.split('.')[1], 'base64');
  return JSON.parse(bufB64.toString())?.sub;
};
