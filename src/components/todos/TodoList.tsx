import { todoType } from '@/types/todoType';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: todoType[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
};

const TodoList = ({ todos, onToggle, onDelete, onEdit }: TodoListProps): JSX.Element => {
  return (
    <div>
      <h2>할일목록</h2>
      {todos.length === 0 ? (
        <p>목록이 없습니다.</p>
      ) : (
        <ul>
          {todos.map(item => (
            <TodoItem
              key={item.id}
              todo={item}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
      {/* 할일 즉 todos는 여러개의 item으로 구성된 배열이다. map으로 출력 */}

      {/* <TodoItem onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} /> */}
    </div>
  );
};

export default TodoList;
