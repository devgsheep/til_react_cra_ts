import { todoType } from '@/types/todoType';

// state
export type todoState = {
  todos: todoType[];
};

// action 타입
export type AddAction = { type: 'ADD'; payload: todoType };
export type ToggleAction = { type: 'TOGGLE'; payload: { id: string } };
export type DeleteAction = { type: 'DELETE'; payload: { id: string } };
export type EditAction = { type: 'EDIT'; payload: { id: string; title: string } };
export type todoAction = AddAction | ToggleAction | DeleteAction | EditAction;

// 촉상태값
export const initialState: todoState = {
  todos: [],
};
