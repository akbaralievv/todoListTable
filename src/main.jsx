import ReactDOM from 'react-dom/client';

import ThemeProvider from './theme/ThemeProvider.jsx';
import App from './App.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
