import React from 'react'
import BuyMe from './BuyMe'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import { Navigate } from 'react-router-dom'

const { Header, Content } = Layout

function MainPage({ collapsed, setCollapsed, login, me, id }) {
    return login ? (
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    }
                )}
            </Header>
            <Content
                className="site-layout-background"
                style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}
            >
                <BuyMe me={me} id={id} />
            </Content>
        </Layout>
    ) : (
        <Navigate to="/login" replace={true} />
    )
}

export default MainPage
