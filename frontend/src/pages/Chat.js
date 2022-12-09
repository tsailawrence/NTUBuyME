import React from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Card } from 'antd'

const { Header, Content } = Layout

function Chat({ collapsed, setCollapsed }) {
    let array = ['1', '2', '3']

    return (
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
                <div>
                    <h1>Chat</h1>
                    {array.map((element, key) => (
                        <Card title={element} style={{ margin: 20 }} key={key}></Card>
                    ))}
                </div>
            </Content>
        </Layout >
    )
}

export default Chat
