import ReactDOM from 'react-dom/client';
import "@silevis/reactgrid/styles.css";
import './styles/style.css';
import App from './views/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);

reportWebVitals();
