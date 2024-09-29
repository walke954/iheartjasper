import { Routes, Route } from 'react-router-dom';

import Poems from './pages/Poems/index.jsx';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Poems />} />
      <Route path="/:poemId" element={<Poems />} />
    </Routes>
  );
}

export default App;
