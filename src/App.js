import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPages from './Pages/MainPage';


function App() {
  return (
    <div className='overflow-x-hidden'>
      <Routes>
        <Route path='/' element={<MainPages />} />
      </Routes>
    </div>
  );
}

export default App;
