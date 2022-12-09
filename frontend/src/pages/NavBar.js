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
import { useNavigate } from 'react-router-dom'

const { Sider } = Layout;

function NavBar({ setKey, collapsed }) {

    const navigate = useNavigate();
    function navigatePage(key) {
        setKey(key);
        switch (key) {
            case "2":
                navigate('/mytasks');
                break;
            case "3":
                navigate('/chat');
                break;
            case "4":
                navigate('/transfer');
                break;
            case "5":
                navigate('/account');
                break;
            default:
                navigate('/')
        }
    }

    return (
        <>
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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={(e) => navigatePage(e.key)}
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
            {/* <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 280, }}>
                </Content>
            </Layout> */}
        </>
    );

}

export default NavBar;