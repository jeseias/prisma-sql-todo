import { TMiddleware } from '../@types';
import { client } from '../prisma/client';

export const doesTodoExist: TMiddleware = async (req, res, next) => {
  const { id } = req.params;

  const todo = await client.todo.findFirst({
    where: { id },
  });

  if (!todo) {
    throw new Error('Todo does not exists!');
  }

  next();
};
