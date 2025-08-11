import { useState } from 'react';
import TodoList from './components/todos/TodoList';
import TodoWrite from './components/todos/TodoWrite';

// 공통으로 사용하는 type 정의 및 interface는 별도의 폴더에 보관하자.
import { ITodo, todoType } from './types/todoType';
import { isTemplateExpression } from 'typescript';
import TodoItem from './components/todos/TodoItem';

// 테스트를 위한 목업데이터 (/src/api/dummy.ts 추천)
const initialTodos: todoType[] = [
  { id: 'a', title: '제목1 입니다', completed: false },
  { id: 'b', title: '제목2 입니다', completed: true },
  { id: 'c', title: '제목3 입니다', completed: false },
  { id: 'd', title: '제목4 입니다', completed: true },
  { id: 'e', title: '제목5 입니다', completed: false },
];

function App(): JSX.Element {
  // ts 자리
  // {id: "", title: "", completed:false}
  const [todos, setTodos] = useState<(todoType | ITodo)[]>(initialTodos);

  // todos를 업데이트 하는 함수
  const handleTodoUpdate = (): void => {
    // setTodos()
  };
  // todo 목록에서 실행할 함수들
  const onToggle = (id: string): void => {
    console.log('onToggle', id);
    // 전달받은 ID를 이용해서 map으로 찾아서 id가 같으면 completed 변경
    const arr: todoType[] = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(arr);
  };
  const onDelete = (id: string): void => {
    console.log('onDelte : ', id);
    // 전달 받은 ID 를 제외한 나머지 만 모아서 목록 변경
    const arr: todoType[] = todos.filter(todo => todo.id !== id);
    setTodos(arr);
  };
  const onEdit = (): void => {
    console.log('onEdit');
  };

  // tsx 자리
  return (
    <div>
      <h1>할일 앱서비스</h1>
      <div>
        <TodoWrite setTodos={setTodos} handleTodoUpdate={handleTodoUpdate} />
        <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </div>
  );
}

export default App;
