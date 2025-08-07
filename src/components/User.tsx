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
