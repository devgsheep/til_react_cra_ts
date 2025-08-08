// 1. type 으로 하겠다.
export type todoType = { id: string; title: string; completed: boolean };

// 2. interface로 하겠다.
export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}
