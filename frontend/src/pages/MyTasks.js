import React from 'react'
import {
    LikeOutlined,
    MessageOutlined,
    StarOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Avatar, List, Space, Layout, Button } from 'antd'
import { useState, useEffect } from 'react'
import instance from '../api'
import { useApp } from '../UseApp'

const { Header, Content } = Layout

function MyTasks({ collapsed, setCollapsed }) {
    const [ tasks, setTasks ] = useState([])
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ nPerPage, setNPerPage] = useState(3)
    const [ maxPageN, setMaxPageN ] = useState(2)
    const [ taskOverload, setTaskOverload ] = useState(false)
    const { me } = useApp()

    useEffect(() => {
        getMyTasks(currentPage, nPerPage, maxPageN)
    }, [currentPage]);

    const getMyTasks = async( me, currentPage, nPerPage, maxPageN ) => {
        const { data: {myTasks, taskOverload} }
        = await instance.get('myTasks', { params:{
            currentPage, nPerPage, maxPageN
        }})
        // console.log(myTasks)
        // console.log(taskOverload)
        setTasks(myTasks)
        setTaskOverload(taskOverload)
    }

    const moreDetail = async () => {

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
                <h1>MyTasks</h1>
                <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        setCurrentPage(page)
                    },
                    pageSize: nPerPage,
                }}
                dataSource={tasks}
                renderItem={(item) => (
                    <List.Item style={{display: 'flex', alignItems: 'flex-end', flexDirection: 'row',}}>
                        <Space style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column',}}>
                        <b>{item.items}</b>
                        {item.note}
                        </Space>
                        <Button onClick={moreDetail(item._id)}>More Detail</Button>
                    </List.Item>
                )}
            />
            </Content>
        </Layout >
    )
}
export default MyTasks
