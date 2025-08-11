import { todoType } from '@/types/todoType';

type TodoItemProps = {
  todo: todoType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: () => void;
};

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  // 수정은 별도의 입력창 구성으로 수정 후 값만 업데이트
  const handleEdit = () => {
    console.log('여기에서 내용을 수정하는 기능 작성 후 완료된 데이터 전송');
    onEdit();
  };

  // CSS 객체 만들기
  const liStyle: React.CSSProperties = {
    color: todo.completed ? '#999' : 'red',
    textDecoration: todo.completed ? 'line-through' : 'none',
    marginBottom: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '200px',
    gap: '10px',
  };

  return (
    <li style={liStyle}>
      <input type="checkbox" onChange={() => onToggle(todo.id)} checked={todo.completed} />
      <span>{todo.title}</span>

      <button onClick={handleEdit}>수정</button>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
};

export default TodoItem;
