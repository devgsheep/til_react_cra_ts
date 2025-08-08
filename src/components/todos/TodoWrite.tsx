import { todoType } from '../../types/todoType';

type TodoWriteProps = {
  setTodos: React.Dispatch<React.SetStateAction<todoType[]>>;
  handleTodoUpdate: () => void;
};

const TodoWrite = ({ setTodos, handleTodoUpdate }: TodoWriteProps) => {
  return <div>TodoWrite</div>;
};

export default TodoWrite;
