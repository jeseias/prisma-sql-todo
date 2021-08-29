import { client } from '../../prisma/client';
import { ICreateTodoRequest, IUpdateTodoRequest } from './create-todo.types';

class TodoUseCases {
  async getAllTodos() {
    const todos = await client.todo.findMany();

    return todos;
  }

  async getOneTodo(id: string) {
    const todo = await client.todo.findFirst({
      where: { id },
    });

    return todo;
  }

  async createTodo({
    title, description, startDate, dueDate,
  }: ICreateTodoRequest) {
    // Verify is they is a todo with this title already
    const todoAlreadyExists = await client.todo.findFirst({
      where: {
        title,
      },
    });

    // Return error if this a todo with this title
    if (todoAlreadyExists) {
      throw new Error('This todo title already exists');
    }

    const todo = await client.todo.create({
      data: {
        title,
        description,
        startDate,
        dueDate,
        isDone: false,
      },
    });

    return todo;
  }

  async updateTodo({
    id, title, description, startDate, dueDate, isDone,
  }: IUpdateTodoRequest) {
    const updatedTodo = await client.todo.update({
      where: { id },
      data: {
        isDone,
        title,
        description,
        startDate,
        dueDate,
      },
    });

    return updatedTodo;
  }

  async deleteTodo(id: string) {
    const todo = await client.todo.delete({
      where: { id },
    });

    return todo;
  }
}

export const todoUseCases = new TodoUseCases();
