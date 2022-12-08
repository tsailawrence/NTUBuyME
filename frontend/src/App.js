import React, { useState } from 'react'
import './index.css'
import { Layout, Menu } from 'antd'
import Login from './pages/Login'
import Register from './pages/Register'
import MainPage from './pages/MainPage'

function App() {
    const [login, setLogin] = useState(false)
    const [register, setRegister] = useState(false)

    return (
        <>
            {login ? (
                <MainPage />
            ) : register ? (
                <Register setRegister={setRegister} />
            ) : (
                <Login setLogin={setLogin} setRegister={setRegister} />
            )}
        </>
    )
}

export default App
