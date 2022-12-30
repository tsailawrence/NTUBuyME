import React, { useState, useEffect } from 'react'

import { LikeOutlined, MessageOutlined, StarOutlined,DownCircleOutlined } from '@ant-design/icons'
import { List, Space,  Button, Card, Divider } from 'antd'

import instance from '../api'
import { all } from 'axios'
import CreateTaskModal from './CreateTaskModal'


function BuyMe() {

    const [tasks, setTasks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [nPerPage, setNPerPage] = useState(3)
    const [maxPageN, setMaxPageN] = useState(2)
    const [taskOverload, setTaskOverload] = useState(false)
    const [CreateTaskModalOpen, setCreateTaskModalOpen] = useState(false)



    useEffect(() => {
        getAllTasks(currentPage, nPerPage, maxPageN)
    }, [currentPage])

    const getAllTasks = async (currentPage, nPerPage, maxPageN) => {
        const {
            data: { allTasks, taskOverload },
        } = await instance.get('allTasks', {
            params: {
                currentPage,
                nPerPage,
                maxPageN,
            },
        })
    }, [currentPage]);

    const getAllTasks = async( currentPage, nPerPage, maxPageN ) => {
        const { data: {allTasks, taskOverload} }
        = await instance.get('allTasks', { params:{
            currentPage, nPerPage, maxPageN
        }})
        // console.log(allTasks)
        // console.log(taskOverload)
        setTasks(allTasks)
        setTaskOverload(taskOverload)
    }

    const getTaskNum = async () => {
        const { data: taskNum } = await instance.get('taskNum')
        // console.log(taskNum)
    }

    const acceptTask = (id) => {
        console.log(id)
        // navigate to chatbox
    }

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h1>BuyMe</h1>
                <Button
                    style={{
                        marginRight: 50,
                        backgroundColor: '#ffdaab',
                    }}
                    onClick={() => {
                        setCreateTaskModalOpen(true)
                    }}
                >
                    + Create New Task
                </Button>
                <CreateTaskModal
                    // user={accountInfo}
                    // open={EditAccModalOpen}
                    onCreate={(values) => {
                        // editAccount(
                        //     me,
                        //     Object.keys(values.user),
                        //     Object.values(values.user)
                        // )
                        CreateTaskModalOpen(false)
                    }}
                    onCancel={() => CreateTaskModalOpen(false)}
                    // item={onClickItem}
                />
            </div>
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
                     <Card>
                     <DownCircleOutlined style={{ fontSize: '15px', color:'#228B22'}}/>
                     <b style={{ fontSize: '15px'}}>  {item.title}</b>
                     <Divider />
                     <Space style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column',}}>
                     <Space><b>Restaurant Name: </b>{item.restaurantName}</Space>
                     <Space><b>Task: </b>{item.taskContent}</Space>
                     <Space><b>Due Time: </b>{item.due_start}~{item.due_end}</Space>
                     </Space>
                     <Divider />
                     <Button onClick={() => acceptTask(item._id)}>Accept Task</Button>
                 </Card>
                )}
            />
        </>
    )
}

export default BuyMe
