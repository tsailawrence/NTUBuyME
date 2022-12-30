import React from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownCircleOutlined,
} from '@ant-design/icons'
import { List, Space, Layout, Button, Tabs, Card, Divider } from 'antd'
import { useState, useEffect } from 'react'
import instance from '../api'
import { useApp } from '../UseApp'
// import styled from "styled-components"


const { Header, Content } = Layout

// const TasksWrapper = styled(Tabs)`
//     width: 100%;
//     height: 300px;
//     background: #eeeeee52;
//     border-radius: 10px;
//     margin: 20px;
//     padding: 20px;
//     overflow: auto;
// `;


function MyTasks({ collapsed, setCollapsed }) {
    const [ addedTasks, setAddedTasks ] = useState([])
    const [ acceptedTasks, setAcceptedTasks ] = useState([])
    const [ currentTab, setCurrentTab ] = useState('')

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ nPerPage, setNPerPage] = useState(10)
    const [ maxPageN, setMaxPageN ] = useState(2)
    const [ taskOverload, setTaskOverload ] = useState(false)
    const { me } = useApp()

    useEffect(()=> setCurrentTab('1'))

    useEffect(() => {
        if(currentTab === '1'){
            getMyAddedTasks(me, currentPage, nPerPage, maxPageN)
        }else{
            getMyAcceptedTasks(me, currentPage, nPerPage, maxPageN)
        }
    }, [currentTab]);

    const getMyAddedTasks = async( me, currentPage, nPerPage, maxPageN ) => {
        const { data: {myTasks, taskOverload} }
        = await instance.get('myAddedTasks', { params:{
            me, currentPage, nPerPage, maxPageN
        }})
        setAddedTasks(displayTasks(myTasks))
        setTaskOverload(taskOverload)
    }

    const getMyAcceptedTasks = async( me, currentPage, nPerPage, maxPageN ) => {
        const { data: {myTasks, taskOverload} }
        = await instance.get('myAcceptedTasks', { params:{
            me, currentPage, nPerPage, maxPageN
        }})
        setAcceptedTasks(displayTasks(myTasks))
        setTaskOverload(taskOverload)
    }

    const displayTasks = (taskArray) => {
        return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    setCurrentPage(page)
                },
                pageSize: nPerPage,
            }}
            dataSource={taskArray}
            renderItem={(item) => (
                <Card>
                    <DownCircleOutlined style={{ fontSize: '15px', color:item.status==='accepted' ? '#b20000' : '#808080' }}/>
                    <b style={{ fontSize: '15px'}}>  {item.title}</b>
                    <Divider />
                    <Space style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column',}}>
                    <Space><b>Restaurant Name: </b>{item.restaurantName}</Space>
                    <Space><b>Task: </b>{item.taskContent}</Space>
                    <Space><b>Due Time: </b>{item.due_start}~{item.due_end}</Space>
                    </Space>
                    <Divider />
                    <Button onClick={() => seeChat(item._id)}>See Chat</Button>
                </Card>
            )}
        /> )
    }

    const onChange = (key) => {
        setCurrentTab(key)
    };

    const seeChat = async (id) => {
        console.log(id)
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

            <Tabs
                defaultActiveKey="1"
                onChange={onChange}
                items={[
                {
                    label: `Tasks I added`,
                    key: '1',
                    children: addedTasks,
                },
                {
                    label: `Tasks I accepted`,
                    key: '2',
                    children: acceptedTasks,
                },
                ]}

            />
            
            </Content>
        </Layout >
    )
}
export default MyTasks
