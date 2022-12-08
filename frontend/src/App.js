
import React, { useState, useEffect } from 'react';
import './index.css';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Register from './pages/Register'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


function App() {
  const [login, setLogin] = useState(false);
  // console.log(login)

  return (
    <>
      <Router>
        <Routes>
          {/* {login ? <MainPage /> : <Login setLogin={setLogin} />} */}
          {/* <Route path="/" element={login ? <MainPage /> : <Navigate path="/login" />} /> */}
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login login={login} setLogin={setLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>

    </>
  )
}

export default App;
