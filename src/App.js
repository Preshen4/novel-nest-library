import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import ReplacingBooks from './components/ReplacingBooksGame';
import Leaderboard from './components/Leaderboard'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/replacingbooks' element={<ReplacingBooks />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
