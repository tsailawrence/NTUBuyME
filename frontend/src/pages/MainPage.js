import React from 'react'
import BuyMe from './BuyMe'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import { Navigate } from 'react-router-dom'
import { useApp } from '../UseApp'

const { Header, Content } = Layout

function MainPage({ collapsed, setCollapsed, login, me, id }) {
    const { LOCALSTORAGE_STATUS } = useApp()

    return localStorage.getItem(LOCALSTORAGE_STATUS) === 'login' ? (
        <Layout className="site-layout">
            {/* <Header
                className="site-layout-background"
                style={{ padding: 0, width: '80%' }}
            >
                {React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    }
                )}
            </Header> */}
            <div>
                <Content
                    className="site-layout-background"
                    style={{
                        // margin: '24px 16px',
                        padding: 24,
                        paddingTop: 50,
                        minHeight: 280,
                        borderRadius: 50,
                        marginTop: 50,
                        marginBottom: 50,
                        // width: '80%',
                        marginRight: '10%',
                    }}
                >
                    <BuyMe me={me} id={id} />
                </Content>
            </div>
        </Layout>
    ) : (
        <Navigate to="/login" replace={true} />
    )
}

export default MainPage
