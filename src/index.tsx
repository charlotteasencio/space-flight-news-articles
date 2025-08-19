import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* Using HashRouter since I want to deploy to github pages without affecting local routes
        most likely would not be necessary outside of this context and would go with BrowserRouter
        for cleaner URLs.""
    */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);