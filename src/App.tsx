import Counter from './components/Counter';
import NameEditor from './components/NameEditor';
import ToggleSwitch from './components/ToggleSwitch';

function App(): JSX.Element {
  return (
    <div>
      <h1>useState 예제</h1>
      <Counter />
      <NameEditor />
      <ToggleSwitch />
    </div>
  );
}

export default App;
