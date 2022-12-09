import React, { useState } from 'react';
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
import BuyMe from './BuyMe';
import Chat from './Chat';
import Transfer from './Transfer';
import Account from './Account'
import Login from './Login';
import Register from './Register'
import MyTasks from './MyTasks';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

function MainPage({ collapsed, setCollapsed }) {

    return (
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed),
                })}
            </Header>
            <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 280, }}>
                <Routes>
                    {/* {content()} */}
                    {/* {login ? <MainPage /> : <Login setLogin={setLogin} />} */}
                    {/* <Route path="/" element={login ? <MainPage /> : <Navigate path="/login" />} /> */}
                    <Route path="/" element={<BuyMe />} />
                    {/* <Route path="/login" element={<Login />} /> */}
                    {/* <Route path="/register" element={<Register />} /> */}
                    <Route path="/mytasks" element={<MyTasks />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/transfer" element={<Transfer />} />
                    <Route path="/account" element={<Account />} />
                </Routes>
            </Content>
        </Layout>
    );

}

export default MainPage;