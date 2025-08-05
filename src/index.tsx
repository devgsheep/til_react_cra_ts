import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// as 문법은 개발자가 HTMLElement라고 확신한다는 것을 VSCode에 알려줌.
// as 문법은 개발자가 null이 아니라고 VSCode에 알려줌.
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
