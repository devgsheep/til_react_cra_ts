import { ChangeEvent, KeyboardEvent, KeyboardEventHandler, useState } from 'react';
import { todoType } from '../../types/todoType';

type TodoWriteProps = {
  setTodos: React.Dispatch<React.SetStateAction<todoType[]>>;
  handleTodoUpdate: (newTodo: todoType) => void;
};

const TodoWrite = ({ setTodos, handleTodoUpdate }: TodoWriteProps) => {
  // js 자리
  // 할일 제목 값 관리
  const [title, setTitle] = useState<string>('');

  // title 변경시 onChange 이벤트 처리해보기
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // enter 키를 입력시 처리
    if (e.key === 'Enter') {
      handleAdd();
    }
  };
  // 새 할일 등록하기
  const handleAdd = () => {
    // 공백 입력 금지하기
    if (title.trim()) {
      const newTodo: todoType = {
        id: Date.now().toString(),
        title: title,
        completed: false,
      };
      // 1. 만약 setTodo 등의 useState를 활용한다면?
      // 아래는 prev : 현재 최신 state을 나타냄
      // setTodos(prev => [newTodo, ...prev]);
      // newTodo가 나중에 들어감 (정렬차이)
      // setTodos(prev => [...prev, newTodo]);

      // 2. 함수의 매개변수로 전달한다면?
      handleTodoUpdate(newTodo);

      setTitle('');
    }
  };
  // jsx 자리
  return (
    <div>
      <input type="text" value={title} onChange={e => handleChange(e)} onKeyDown={handleKeyDown} />
      <button onClick={handleAdd}>등록</button>
    </div>
  );
};

export default TodoWrite;
