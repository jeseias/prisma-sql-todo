export interface ICreateTodoRequest {
  title: string;
  description: string;
  startDate: Date;
  dueDate: Date;
}

export type TUpdateTodoRequest = ICreateTodoRequest & {
  isDone: boolean
}

export interface IGetOneTodoRequest {
  id: string
}

export interface IUpdateTodoRequest extends ICreateTodoRequest {
  id: string
  isDone: boolean
}
