import React, { useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Input, Layout } from 'antd'
import axios from '../api'

const { Header, Content } = Layout
const { Search } = Input

function Transfer({ collapsed, setCollapsed }) {
    const [id, setId] = useState()

    const searchId = async () => {
        const {
            data: { account },
        } = await axios.get('/transfer', { id })
    }

    // useEffect(() => {
    //     console.log(id)
    // }, [id])

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
                    onClick={searchId}
                    value={id}
                    onChange={(e) => {
                        setId(e.target.value)
                    }}
                />
            </Content>
        </Layout>
    )
}

export default Transfer
