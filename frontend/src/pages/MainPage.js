import React, { useEffect, useState } from 'react';
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
import MyTasks from './MyTasks';
import Chat from './Chat';
import Transfer from './Transfer';
import Account from './Account'

const { Header, Sider, Content } = Layout;

function MainPage() {
    const [collapsed, setCollapsed] = useState(false);
    const [key, setKey] = useState(1);

    function content() {
        switch (key) {
            case "2":
                return <MyTasks></MyTasks>
            case "3":
                return <Chat></Chat>
            case "4":
                return <Transfer></Transfer>
            case "5":
                return <Account></Account>
            default:
                return <BuyMe></BuyMe>
        }
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{
                overflow: 'auto', height: '100vh', left: 0, top:
                    0, bottom: 0,
            }}>
                <div className="logo" style={{
                    color: "white", display: "flex", alignItems: "center",
                    justifyContent: "Center"
                }}>
                    <h1>NTU BuyMe</h1>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={(e) => setKey(e.key)}
                    items={[
                        {
                            key: '1',
                            icon:
                                <CoffeeOutlined />,
                            label: 'BuyMe',
                        },
                        {
                            key: '2',
                            icon:
                                <SolutionOutlined />,
                            label: 'MyTasks',
                        },
                        {
                            key: '3',
                            icon:
                                <MessageOutlined />,
                            label: 'Chat',
                        },
                        {
                            key: '4',
                            icon:
                                <TransactionOutlined />,
                            label: 'Transfer',
                        },
                        {
                            key: '5',
                            icon:
                                <UserOutlined />,
                            label: 'Account',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 280, }}>
                    {content()}
                </Content>
            </Layout>
        </Layout>
    );

}

export default MainPage;