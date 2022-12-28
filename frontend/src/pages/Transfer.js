import React, { useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Input, Layout } from 'antd'
import axios from '../api'

const { Header, Content } = Layout
const { Search } = Input

function Transfer({ collapsed, setCollapsed }) {
    const [id, setId] = useState()

    const searchId = async (id) => {
        // console.log(id)
        const {
            data: { user },
        } = await axios.get('/transfer', {
            params: {
                userId: id,
            },
        })
        console.log(user)
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
