import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const elem = document.getElementById('root');

ReactDOM.createRoot(elem).render(
    <StrictMode>
        <App />
    </StrictMode>
);
