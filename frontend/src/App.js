import React, { useState, useEffect } from 'react'
import './index.css'
import Login from './pages/Login'
import MainPage from './pages/MainPage'
import Register from './pages/Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
    const [login, setLogin] = useState(false)

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route
                        path="/login"
                        element={<Login login={login} setLogin={setLogin} />}
                    />
                    <Route
                        path="/register"
                        element={<Register setLogin={setLogin} />}
                    />
                </Routes>
            </Router>
        </>
    )
}

export default App
