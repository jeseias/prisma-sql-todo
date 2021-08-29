import { Router } from 'express';
import { doesTodoExist } from './middlewares/does-todo-exists';
import { todoController } from './useCases/todo/todo-controller';

const router = Router();

router
  .route('/todos')
  .get(todoController.index)
  .post(todoController.create);

router
  .route('/todos/:id')
  .get(doesTodoExist, todoController.show)
  .patch(doesTodoExist, todoController.update)
  .delete(doesTodoExist, todoController.destroy);

export default router;
