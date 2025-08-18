import { Route, Routes } from 'react-router-dom';
import NewsArticlesPage from './NewArticlesPage';
import NewsArticleDetails from './NewsArticleDetails';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NewsArticlesPage />} />
      <Route path="/details/:id" element={<NewsArticleDetails />} />
    </Routes>
  );
}

export default App;
