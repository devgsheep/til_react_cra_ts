# useState

- 리액트용 변수이다. (수업편의)
- set으로 값을 변화시키면 리랜더링을 한다.

## 0. `@` 으로 절대경로 설정하기

- tsconfig.json

```json
"baseUrl": "src", // 프로젝트의 기본 경로
    "paths": {
      "@/*": ["*"], // @/ 로 src 폴더 전체를 참조
      "@types/*": ["types/*"] // @types 로 src/types 참조
    },
```

## 1. 기본예제

- /src/components 폴더 생성
- Counter.tsx 파일 생성

```tsx
import { useState } from 'react';

// 2번이상 반복되고, 가독성이 떨어집니다.
// 1. type으로 정의해 보자.
type VoidFunction = () => void;
type JSXElement = () => JSX.Element;

// 2. interface로 정의해보자
interface IVoidFunction {
  (): void;
}
interface IJSXElement {
  (): JSX.Element;
}

const Counter: IJSXElement | JSXElement = (): JSX.Element => {
  // ts 자리
  const [count, setCount] = useState<number>(0);

  const handleAdd: IVoidFunction | VoidFunction = (): void => {
    setCount(count + 1);
  };
  const handleMinus: IVoidFunction | VoidFunction = (): void => {
    setCount(count - 1);
  };
  const handleReset: IVoidFunction | VoidFunction = (): void => {
    setCount(0);
  };
  // tsx 자리
  return (
    <div>
      <h2>Counte : {count} </h2>
      <button onClick={handleAdd}>증가</button>
      <button onClick={handleMinus}>감소</button>
      <button onClick={handleReset}>초기화</button>
    </div>
  );
};

export default Counter;
```

## 2. 실습 예제 1

- /src/components/NameEditor.tsx

```tsx
import { ChangeEvent, useState, MouseEvent } from 'react';

// 1. type 으로 함수 리턴형을 생성해보자.
type JSXElement = () => JSX.Element;
type ChangeEventInput = (e: ChangeEvent<HTMLInputElement>) => void;
type ClickEventButton = (e: MouseEvent<HTMLButtonElement>) => void;
type NameType = string;

// 2. interface로 정의하기
interface IJSXElement {
  (): JSX.Element;
}
interface IChangeEventInput {
  (e: ChangeEvent<HTMLInputElement>): void;
}
interface IClickEventButton {
  (e: MouseEvent<HTMLButtonElement>): void;
}

const NameEditor: JSXElement | IJSXElement = () => {
  // ts자리
  const [name, setName] = useState<NameType>('');
  const handleName: ChangeEventInput | IChangeEventInput = (e): void => {
    setName(e.target.value);
  };
  const handleClick: ClickEventButton | IClickEventButton = (e): void => {
    console.log('클릭');
    setName('');
  };
  // tsx자리
  return (
    <div>
      <h2>NameEditor : {name}</h2>
      <div>
        <input type="text" value={name} onChange={e => handleName(e)} />
        <button onClick={e => handleClick(e)}>확인</button>
      </div>
    </div>
  );
};

export default NameEditor;
```

## 3. 실습 예제 2

- /src/components/ToggleSwitch.tsx

```tsx
import { useState } from 'react';

// 1. Type
type ToggleSwitchType = () => JSX.Element;
type HandleClickType = () => void;
type ToggleType = boolean;

// 2. interface
interface IToggleSwitch {
  (): JSX.Element;
}
interface IHandleClickType {
  (): void;
}

const ToggleSwitch: ToggleSwitchType | IToggleSwitch = () => {
  // ts 자리
  const [isOn, setIsOn] = useState<ToggleType>(false);
  const handleClick: HandleClickType | IHandleClickType = () => {
    setIsOn(!isOn);
  };
  // tsx 자리
  return (
    <div>
      <h2>ToggleSwitch : {isOn ? '밝아요' : '어두워요'}</h2>
      <div>
        <button onClick={handleClick}>토글</button>
      </div>
    </div>
  );
};

export default ToggleSwitch;
```

## 4. 실습 예제 3

- /src/components/User.tsx

```tsx
import { useState } from 'react';

// 1. type 정의
type UserType = { age: number; name: string };
type ClickType = () => void;

const User = (): JSX.Element => {
  // 2. interface 정의
  interface IUser {
    age: number;
    name: string;
  }
  interface IClick {
    (): void;
  }

  // ts 자리
  const [user, setUser] = useState<UserType | IUser>({ name: '아이유', age: 20 });
  const handleClick: ClickType | IClick = () => {
    setUser({ ...user, age: user.age + 1 });
  };
  // tsx 자리
  return (
    <div>
      <h2>
        User : {user.name}님 나이는 {user.age} 입니다.
      </h2>
      <div>
        <button onClick={handleClick}>나이 증가</button>
      </div>
    </div>
  );
};

export default User;
```

## 5. 실습 예제 4 (useState 버전 Todo)

- 타입정의를 위한 폴더 : /src/types 폴더 생성
  - todoType.ts 파일 생성

- 글쓰기 : /src/components/todos/TodoWrite.tsx
  - 입력창, 등록버튼

- 글목록 : /src/components/todos/TodoList.tsx

- 글 한개의 아이템 : /src/components/todos/TodoItem.tsx
  - 아이디, 제목, 완료여부, 수정버튼, 삭제버튼
  - 상태 2가지 : 목록상태, 편집상태

- App.tsx

```tsx
import { useState } from 'react';
import TodoList from './components/todos/TodoList';
import TodoWrite from './components/todos/TodoWrite';

// 공통으로 사용하는 type 정의 및 interface는 별도의 폴더에 보관하자.
import { ITodo, todoType } from './types/todoType';
import { isTemplateExpression } from 'typescript';
import TodoItem from './components/todos/TodoItem';

// 테스트를 위한 목업데이터 (/src/api/dummy.ts 추천)
const initialTodos: todoType[] = [];

function App(): JSX.Element {
  // ts 자리
  // {id: "", title: "", completed:false}
  const [todos, setTodos] = useState<(todoType | ITodo)[]>(initialTodos);

  // todos를 업데이트 하는 함수
  const handleTodoUpdate = (newTodo: todoType): void => {
    // setTodos(prev => [newTodo, ...prev]);
    const arr: todoType[] = [newTodo, ...todos];
    setTodos(arr);
  };
  // todo 목록에서 실행할 함수들
  const onToggle = (id: string): void => {
    // console.log('onToggle', id);
    // 전달받은 ID를 이용해서 map으로 찾아서 id가 같으면 completed 변경
    const arr: todoType[] = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(arr);
  };
  const onDelete = (id: string): void => {
    // console.log('onDelte : ', id);
    // 전달 받은 ID 를 제외한 나머지 만 모아서 목록 변경
    const arr: todoType[] = todos.filter(todo => todo.id !== id);
    setTodos(arr);
  };
  const onEdit = (id: string, newTitle: string): void => {
    // console.log('onEdit id', id);
    // console.log('onEdit title', newTitle);
    // 아이디와 새로운 타이틀을 알 수 있다.
    // 아이디를 이용해서 해당 타이틀을 수정하고 업데이트 해보자.
    const arr: todoType[] = todos.map(item =>
      item.id === id ? { ...item, title: newTitle } : item,
    );
    setTodos(arr);
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
```

- /src/components/todos/TodoWrite.tsx

```tsx
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
```

- src/components/todos/TodoList.tsx

```tsx
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
```

- src/components/todos/TodoItem.jsx

```tsx
import { todoType } from '@/types/todoType';
import { KeyboardEvent, useState } from 'react';

type TodoItemProps = {
  todo: todoType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
};

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  // js 자리
  // 현재 Edit 상태인지 아닌지 관리
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // Edit 상태라면 입력중인 title 내용 관리
  const [editTitle, setEditTitle] = useState<string>(todo.title);

  // jsx 자리

  // 수정은 별도의 입력창 구성으로 수정 후 값만 업데이트
  const handleEdit = () => {
    // console.log('여기에서 내용을 수정하는 기능 작성 후 완료된 데이터 전송');
    // isEdit을 true로 변경
    setIsEdit(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditSave();
    }
    if (e.key === 'Escape') {
      handleEditCancel();
    }
  };
  // 수정 후 저장 기능
  const handleEditSave = () => {
    // console.log('수정완료 저장');
    // 1. 업데이트 해줌
    if (editTitle.trim()) {
      // 변경되어야 할 ID, 새로운 타이틀 전달
      onEdit(todo.id, editTitle);
      // 2. 상태는 isEdit을 false로 변경
      setIsEdit(false);
    }
  };
  // 수정 취소 기능
  const handleEditCancel = () => {
    // 1. editTitle을 원래대로 돌리고
    setEditTitle(todo.title);
    // 2. isEdit을 false로 설정하고
    setIsEdit(false);
  };

  // CSS 객체 만들기
  const liStyle: React.CSSProperties = {
    color: todo.completed ? '#999' : 'red',
    textDecoration: todo.completed ? 'line-through' : 'none',
    marginBottom: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  };

  return (
    <li style={liStyle}>
      {isEdit ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleEditSave}>저장</button>
          <button onClick={handleEditCancel}>취소</button>
        </>
      ) : (
        <>
          <input type="checkbox" onChange={() => onToggle(todo.id)} checked={todo.completed} />
          <span>{todo.title}</span>
          <button onClick={handleEdit}>수정</button>
          <button onClick={() => onDelete(todo.id)}>삭제</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
```
