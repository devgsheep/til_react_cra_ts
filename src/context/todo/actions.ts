import { todoType } from '@/types/todoType';
import { DeleteAction, EditAction, todoAction, ToggleAction } from './types';

export const addTodo = (todo: todoType): todoAction => ({
  type: 'ADD',
  payload: todo,
});

export const toggleTodo = (id: string): ToggleAction => ({
  type: 'TOGGLE',
  payload: { id },
});

export const deleteTodo = (id: string): DeleteAction => ({
  type: 'DELETE',
  payload: { id },
});

export const editTodo = (id: string, title: string): EditAction => ({
  type: 'EDIT',
  payload: { id, title },
});
