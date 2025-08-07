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
