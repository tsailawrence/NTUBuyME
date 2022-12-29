import React, { useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Input, Layout } from 'antd'
import { useApp } from '../UseApp'
import axios from '../api'

const { Header, Content } = Layout
const { Search } = Input

function Transfer({ collapsed, setCollapsed }) {
    const { status, setStatus } = useApp()
    const [id, setId] = useState()

    const searchId = async (id) => {
        // console.log(id)
        const {
            data: { message, content },
        } = await axios.get('/transfer', {
            params: {
                userId: id,
            },
        })
        switch (message) {
            default:
                break
            case 'error':
                setStatus({
                    type: 'error',
                    msg: content,
                })
                alert(content)
                break
            case 'success':
                console.log(content.name)
        }
    }

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
                <h1>Transfer</h1>
                <Search
                    placeholder="Input Student ID"
                    enterButton
                    value={id}
                    onSearch={searchId}
                />
            </Content>
        </Layout>
    )
}

export default Transfer
