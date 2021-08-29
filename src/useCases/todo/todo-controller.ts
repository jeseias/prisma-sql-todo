import { Request, Response } from 'express';
import { todoUseCases } from './todo-usecases';
import { ICreateTodoRequest, TUpdateTodoRequest } from './create-todo.types';

class TodoController {
  async create(request: Request, response: Response) {
    const {
      title, description, startDate, dueDate,
    }: ICreateTodoRequest = request.body;

    const todo = await todoUseCases.createTodo({
      title, description, startDate, dueDate,
    });

    return response.status(200).json({
      data: todo,
    });
  }

  async index(request: Request, response: Response) {
    const todos = await todoUseCases.getAllTodos();

    return response.status(200).json({
      length: todos.length,
      data: todos,
    });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const todo = await todoUseCases.getOneTodo(id);

    return response.status(200).json({
      data: todo,
    });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      title, description, startDate, dueDate, isDone,
    }: TUpdateTodoRequest = request.body;

    const updatedTodo = await todoUseCases.updateTodo({
      id,
      title,
      description,
      startDate,
      dueDate,
      isDone,
    });

    return response.status(200).json({
      data: updatedTodo,
    });
  }

  async destroy(request: Request, response: Response) {
    const { id } = request.params;

    await todoUseCases.deleteTodo(id);

    return response.status(204).json({
      message: 'Todo deleted with success',
    });
  }
}

export const todoController = new TodoController();
