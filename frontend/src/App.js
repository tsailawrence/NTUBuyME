import React, { useState, useEffect } from 'react';
import './index.css';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Register from './pages/Register'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MyTasks from './pages/MyTasks';
import NavBar from './pages/NavBar';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  MessageOutlined,
  TransactionOutlined,
  CoffeeOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Header, Sider, Content } = Layout;

<<<<<<< Updated upstream
=======
function App() {
    const [login, setLogin] = useState(false)
    const [collapsed, setCollapsed] = useState(false)
    const [key, setKey] = useState(1)
    const { pathname } = useLocation()

>>>>>>> Stashed changes

function App() {
  const [login, setLogin] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState(1);

  return (
    <Router>
      <Layout>
        <NavBar setKey={setKey} collapsed={collapsed} />
        <MainPage collapsed={collapsed} setCollapsed={setCollapsed} />
      </Layout>
    </Router>
  )
}

export default App
